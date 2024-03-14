/*
 * @Author: Arthur
 * @Date: 2020-05-13 13:51:33
 * @LastEditors: Arthur
 * @LastEditTime: 2020-05-13 13:52:40
 * @Description: file conten
 */
// 切片上传大文件 ，合并文件 合并文件 nodejs
exports.merge = {
    validate: {
        query: {
        fileName: Joi.string()
            .trim()
            .required()
            .description('文件名称'),
        md5: Joi.string()
            .trim()
            .required()
            .description('文件md5'),
        size: Joi.string()
            .trim()
            .required()
            .description('文件大小'),
        },
    },
    permission: {
        roles: ['user'],
    },
    async handler (ctx) {
        const { fileName, md5, size } = ctx.request.query
        let { name, base: filename, ext } = path.parse(fileName)
        const newFileName = randomFilename(name, ext)
        await mergeFiles(path.join(uploadDir, md5), uploadDir, newFileName, size)
        .then(async () => {
            const file = {
                key: newFileName,
                name: filename,
                mime_type: mime.getType(`${uploadDir}/${newFileName}`),
                ext,
                path: `${uploadDir}/${newFileName}`,
                provider: 'oss',
                size,
                owner: ctx.state.user.id,
            }
            const key = encodeURIComponent(file.key).replace(/%/g, '').slice(-100)
            file.url = await uploadLocalFileToOss(file.path, key)
            file.url = getFileUrl(file)
            const f = await File.create(omit(file, 'path'))
            const files = []
            files.push(f)
            ctx.body = invokeMap(files, 'toJSON')
        })
        .catch(() => {
            throw Boom.badData('大文件分片合并失败，请稍候重试~')
        })
    },
}

