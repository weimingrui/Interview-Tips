/*
 * @Author: your name
 * @Date: 2020-05-08 10:39:53
 * @LastEditTime: 2020-05-08 10:47:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/Interview-Tips/插入排序.js
 */
//将一个记录插入到已经排好序的有序表中，从而一个新的、记录数增1的有序表,不断递推增长到所有队列都排序完成
function InsertionSort (arr) {
    const length = arr.length
    for (let i = 1; i < length; i++) {
        const temp = arr[i]
        let j
        for (j = i - 1; j >= 0 && temp < arr[j]; j--) {
            arr[j+1] = arr[j]
        }
        arr[j+1] = temp
    }
    return arr
}

export default InsertionSort