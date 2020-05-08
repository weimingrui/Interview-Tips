/*
 * @Author: Arthur
 * @Date: 2020-05-08 14:50:34
 * @LastEditors: Arthur
 * @LastEditTime: 2020-05-08 14:55:57
 * @Description: file content
 */
/*
归并操作的工作原理如下：
第一步：申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
第二步：设定两个指针，最初位置分别为两个已经排序序列的起始位置
第三步：比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
重复步骤3直到某一指针超出序列尾
将另一序列剩下的所有元素直接复制到合并序列尾
 */
function MergeSort (arr, low, high) {
    const length = arr.length
    if (low === high) {
        return arr[low]
    }
    const mid = Math.floor((low + high)/2)
    MergeSort(arr, low, mid)
    MergeSort(arr, mid + 1, high)
    merge(arr, low, high)
    return arr

}

function merge (arr, low, high) {
    const mid = Math.floor((low + high)/2)
    let left = low
    let right = mid + 1
    const result = []
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            result.push(arr[left++])
        } else {
            result.push(arr[right++])
        }
    }
    while (left <= mid) {
        result.push(arr[left++])
    }
    while (right <= high) {
        result.push(arr[right++])
    }

    arr.splice(low, high-low+1, ...result)
}

function mergePass(arr = [], temp = new Array(arr.length), N = arr.length, length = 1){ // 将每个元素看作是相邻的数组长度为1。
    let t; // 迭代深度。
    for (t = 0; Math.pow(2,t) < N; t++, length *= 2) { // 每次跳过的长度翻倍。
        const even = t%2 === 0; // 复用 arr 和 temp 来回赋值。
        for (let left = 0;  left < N; left += 2 * length) { // 左边数组起始位置 left 从0开始。
            const middle = left + length < N ? left + length : left; // 右边数组起始位置 middle 就是left + 一个数组长度length 但是不要超过 N 。
            const right = left + (2 * length) < N ? left + (2 * length) : N; // 右边界 right 就是 left + 两个数组长度。
            merge(even ? arr : temp, even ? temp : arr, left, middle, right); // 合并每两个相邻的数组。
        }
    }
    if(t % 2 === 0){
        return arr;//返回arr
    }
    return temp; // 返回 temp 。
}
function merge(arr, temp, left, middle, right){
    const leftEnd = middle - 1; // 通过右边数组的起始位置得到左边数组的结束位置。
    while (left <= leftEnd && middle < right) { // 如果‘指针’没有越界。
        if (arr[left] > arr[middle]) { // 如果左边数组第一个元素比右边数组第一个元素大。
            temp[left + middle - leftEnd -1] = arr[middle++]; // 将右边数组最小的放入有序数组 temp（初始值为空)。
        } else {
            temp[left + middle - leftEnd -1] = arr[left++]; // 将左边数组最小的放入有序数组 temp（初始值为空)。
        }
    }
    while(left > leftEnd && middle < right){ // 如果左边数组放完了，右边数组还有元素。
        temp[left + middle - leftEnd -1] = arr[middle++]; // 那么依次将右边数组剩余的元素放入 temp 。
    }
    while(left <= leftEnd && middle >= right){ // 如果右边数组放完了，左边数组还有元素
        temp[left + middle - leftEnd -1] = arr[left++]; // 那么依次将左边数组剩余的元素放入 temp 。
    }
}
// const test = [2, 34, 452,3,5, 785, 32, 345, 567, 322,5]

// console.log(MergeSort(test, 0, test.length - 1))
export default MergeSort