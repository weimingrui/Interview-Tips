/*
 * @Author: your name
 * @Date: 2020-05-08 10:36:53
 * @LastEditTime: 2020-05-08 10:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/Interview-Tips/选择排序.js
 */
/*
原理： 第一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，
然后再从剩余的未排序元素中寻找到最小（大）元素，然后放到已排序的序列的末尾。
以此类推，直到全部待排序的数据元素的个数为零。选择排序是不稳定的排序方法

 寻找第i小的数的位置，放到i位置上
 */
function SelectionSort (arr) {
    const length = arr.length
    for (let i = 0; i < length; i++ ) {
        let minIndex= i
        for (let j = i + 1; j < length; j++) {
            minIndex = arr[minIndex] <= arr[j] ? minIndex : j
        }
        if (minIndex !== i) {
            const temp = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = temp

        }
    }
    return arr
}
export default SelectionSort