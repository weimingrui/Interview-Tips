/*
 * @Author: Arthur
 * @Date: 2021-03-07 21:53:07
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-07 22:09:01
 * @Description: file content
 */
Promise.myRace = function(arr) {
    new Promise((resolve,reject)=>{
        arr.forEach(promise=>{
            promise.then(res=>{
                return resolve(res);
            },rej=>{
                reject(rej)
            })
        }).catch(err=>{
            throw new Error(err)
        })
    })
}