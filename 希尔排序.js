/*
 * @Author: your name
 * @Date: 2020-05-08 10:39:53
 * @LastEditTime: 2020-05-08 13:52:35
 * @LastEditors: Arthur
 * @Description: In User Settings Edit
 * @FilePath: /myCode/Interview-Tips/插入排序.js
 */
/*
基本思想
先取一个小于n的整数d1作为第一个增量，把文件的全部记录分成d1个组。
所有距离为dl的倍数的记录放在同一个组中。先在各组内进行直接插入排序；
然后，取第二个增量d2<d1重复上述的分组和排序，直至所取的增量dt=1(dt<dt-l<；…<d2<d1），
即所有记录放在同一组中进行直接插入排序为止。
该方法实质上是一种分组插入方法。
想法：
先取一个增量序列[23,3,11,24,45,43,67,49,33,44,66,8,10,76,28]
将一串需排序的数列先按照7分组，每组2个数。对每组2个数进行排序
接下来按照3分组，每组五个数。
对每组五个数进行排序。
接下来是1 也就是进行直接插入排序。
*/ 
function ShellSort (arr) {
    const length = arr.length;
    // 分割段数
    let gap = Math.floor(length);
    while (gap) {
        for (let i = gap; i < length; i++) {
            const temp = arr[i];
            let j;
            for (j = i - gap; j >= 0 && temp < arr[j]; j = j - gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = temp
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
function shellsortSh(p=[],n)
{
    let op=0;
    let h,i,j,temp;
    for(h=n/2;h>0;h=h/2){
        for(i=h;i<n;i++){
            temp=p[i];
            for(j=i-h;j>=0&&p[j]>temp;j-=h){
                p[j+h]=p[j];
                op++;
            }
            p[j+h]=temp;
            op++;
        }
    }
    return op;
}
 
export default ShellSort