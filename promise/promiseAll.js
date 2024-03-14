/*
 * @Author: Arthur
 * @Date: 2021-03-07 21:49:55
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-07 22:53:53
 * @Description: file content
 */

Promise.myAll = function(arr) {
    return new Promise((resolve,reject)=>{
        let result = [];
        let resCounter = 0;
        let resLen = arr.length;
        let isAllResolved = true;
        arr.forEach((promise,ind)=>{
            promise.then(
                (res)=>{
                    result[ind] = res;
                    resCounter++
                    if (resCounter === resLen && isAllResolved) {
                        resolve(result)
                    }
                },
                (rej)=>{
                    reject(result);
                    // 用于变形
                    // result[ind] = rej;
                    // isAllResolved = false;
                    // resCounter++;
                    // if (resCounter === resLen) {
                    //     reject(result)
                    // }
                }
            );
        })
    })
}