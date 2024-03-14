/*
 * @Author: Arthur
 * @Date: 2020-05-13 13:44:38
 * @LastEditors: Arthur
 * @LastEditTime: 2020-05-13 14:06:08
 * @Description: 大文件切片上传问题:
 * 将一个大文件切片成多个小文件，并行请求接口进行上传，
 * 所有请求得到响应后，
 * 在服务器端合并所有的分片文件。
 * 当分片上传失败，可以在重新上传时进行判断，
 * 只上传上次失败的部分，减少用户的等待时间，缓解服务器压力
 */
/*
Blob.slice 将文件切片，并发上传多个切片，所有切片上传后告知服务器合并，实现大文件分片上传；
原生 XMLHttpRequest 的 onprogress 对切片上传进度的监听，实时获取文件上传进度；
spark-md5 根据文件内容算出文件 MD5，得到文件唯一标识，与文件上传状态绑定；
分片上传前通过文件 MD5 查询已上传切片列表，上传时只上传未上传过的切片，实现断点续传。
*/

// 修改时间+文件名称+最后修改时间-->MD5
function md5File (file) {
    return new Promise((resolve, reject) => {
            let blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice
            let chunkSize = file.size / 100
            let chunks = 100
            let currentChunk = 0
            let spark = new SparkMD5.ArrayBuffer()
            let fileReader = new FileReader()
            fileReader.onload = function (e) {
            console.log('read chunk nr', currentChunk + 1, 'of', chunks)
            spark.append(e.target.result) // Append array buffer
            currentChunk++
            if (currentChunk < chunks) {
                loadNext()
            } else {
                let cur = +new Date()
                console.log('finished loading')
                // alert(spark.end() + '---' + (cur - pre)); // Compute hash
                let result = spark.end()
                resolve(result)
            }
        }
        fileReader.onerror = function (err) {
            console.warn('oops, something went wrong.')
            reject(err)
        }
        function loadNext () {
            let start = currentChunk * chunkSize
            let end =
                start + chunkSize >= file.size ? file.size : start + chunkSize
            fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
    })
}


// 校验文件的MD5
function checkFileMD5 (file, fileName, fileMd5Value, onError) {
    const fileSize = file.size
    const { chunkSize, uploadProgress } = this
    this.chunks = Math.ceil(fileSize / chunkSize)
    return new Promise(async (resolve, reject) => {
        const params = {
        fileName: fileName,
        fileMd5Value: fileMd5Value,
        }
        const { ok, data } = await services.checkFile(params)
        if (ok) {
        this.hasUploaded = data.chunkList.length
        uploadProgress(file)
        resolve(data)
        } else {
        reject(ok)
        onError()
        }
    })
}
// 文件分片
async function checkAndUploadChunk (file, fileMd5Value, chunkList) {
    let { chunks, upload } = this
    const requestList = []
    for (let i = 0; i < chunks; i++) {
        let exit = chunkList.indexOf(i + '') > -1
        // 如果已经存在, 则不用再上传当前块
        if (!exit) {
            requestList.push(upload(i, fileMd5Value, file))
        }
    }
    console.log({ requestList })
    const result =
        requestList.length > 0
        ? await Promise.all(requestList)
            .then(result => {
            console.log({ result })
            return result.every(i => i.ok)
            })
            .catch(err => {
            return err
            })
        : true
    console.log({ result })
    return result === true
}
// 上传chunk
function upload (i, fileMd5Value, file) {
    const { uploadProgress, chunks } = this
    return new Promise((resolve, reject) => {
        let { chunkSize } = this
        // 构造一个表单，FormData是HTML5新增的
        let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize
        let form = new FormData()
        form.append('data', file.slice(i * chunkSize, end)) // file对象的slice方法用于切出文件的一部分
        form.append('total', chunks) // 总片数
        form.append('index', i) // 当前是第几片
        form.append('fileMd5Value', fileMd5Value)
        services.uploadLarge(form).then(data => {
            if (data.ok) {
                this.hasUploaded++
                uploadProgress(file)
            }
            console.log({ data })
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

