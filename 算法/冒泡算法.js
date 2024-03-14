/*
 * @Author: your name
 * @Date: 2020-05-07 16:06:20
 * @LastEditTime: 2020-05-07 16:06:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/samll-demo/冒泡算法.js
 */

/*
第1次循环确定最大的
第n次循环确定第n大的
 */
function BubbleSort (arr) {
    const length = arr.length

    for (let i = 0; i < length; i++) {
        for (let j = 1; j < length-i; j++) {
            if (arr[j] < arr[j - 1]) {
                const temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            }
        }
    }

    return arr
}

export default BubbleSort;