/*
 * @Author: your name
 * @Date: 2020-05-07 16:07:08
 * @LastEditTime: 2020-05-07 17:03:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/samll-demo/快速排序算法.js
 */
/*
在左边找大数，在右边找小数, 依次递推 交换
 */
function QuickSort(arr, low, high) {
    let left = low
    let right = high
    let basic = arr[low]
    while (left < right) {
        //右边遍历找到比基数小的数，停止
        while (left < right && arr[right] > basic) {
            right--
        }
         //左边遍历找到比基数大的数,停止
        while (left < right && arr[left] <= basic) {
            left++
        }

        if (left < right) {
            // 数组未遍历全，交换当前索引的左右值，继续遍历剩余未遍历的数组
            const temp = arr[left]
            arr[left] = arr[right]
            arr[right] = temp
        } else {
            
            // 交换基数和当前结束遍历时的索引，
            const temp = arr[low]
            arr[low] = arr[left]
            arr[left] = temp
            // 遍历结束，左边的数都比基数小，右边的数都比基数大，递推拆分结束后的是左右两边的数组
            QuickSort(arr, low, left - 1)
            QuickSort(arr, right + 1, high)
        }
    }

    return arr
}

// 第二种方法 在左边找大数，在右边找小数, 依次递推，不断拆分成左边都是小数，右边都是大数，直至最小数组不可拆分
function quickSort(arr, low, high) {

    if (low < high) {
        // 找寻基准数据的正确索引
        let index = getIndex(arr, low, high);

        // 进行迭代对index之前和之后的数组进行相同的操作使整个数组变成有序
        quickSort(arr, 0, index - 1);
        quickSort(arr, index + 1, high);
    }

}
function getIndex(arr, low, high) {
    // 基准数据
    let tmp = arr[low];
    while (low < high) {
        // 当队尾的元素大于等于基准数据时,向前挪动high指针
        while (low < high && arr[high] >= tmp) {
            high--;
        }
        // 如果队尾元素小于tmp了,需要将其赋值给low
        arr[low] = arr[high];
        // 当队首元素小于等于tmp时,向前挪动low指针
        while (low < high && arr[low] <= tmp) {
            low++;
        }
        // 当队首元素大于tmp时,需要将其赋值给high
        arr[high] = arr[low];

    }
    // 跳出循环时low和high相等,此时的low或high就是tmp的正确索引位置
    // 由原理部分可以很清楚的知道low位置的值并不是tmp,所以需要将tmp赋值给arr[low]
    arr[low] = tmp;
    return low; // 返回tmp的正确位置
}
export default QuickSort;