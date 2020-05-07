/*
 * @Author: your name
 * @Date: 2020-05-07 16:50:39
 * @LastEditTime: 2020-05-07 16:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /myCode/samll-demo/无重复字符的最长子串.js
 */
// 解题思路： 使用一个数组来维护滑动窗口
// 遍历字符串，判断字符是否在滑动窗口数组里

// 不在则 push 进数组
// 在则删除滑动窗口数组里相同字符及相同字符前的字符，然后将当前字符 push 进数组
// 然后将 max 更新为当前最长子串的长度

// 遍历完，返回 max 即可

var lengthOfLongestSubstring = function(s) {
    let arr = [], max = 0
    for(let i = 0; i < s.length; i++) {
        let index = arr.indexOf(s[i]); // 寻找已存在的字符
        if(index !== -1) {
            // 删除已存在之前的所有字符
            arr.splice(0, index+1);
        }
        // 数组里找不到相同的字符，添加新字符
        arr.push(s.charAt(i));
        // 更新最长子串
        max = Math.max(arr.length, max) 
    }
    return max
};
// 不创建新数组，但是要记住数组里的出现相同字符的下标
function getMaxLen(str) {
    var maxLen = 0, startIndex = 0;
    for(var i = 0; i < str.length; i++) {
        for(var j = startIndex; j < i; j++) {
            if (str[j] === str[i]){
                startIndex = j + 1;
                break
            }
        }
        maxLen = Math.max(maxLen, i - startIndex + 1);
    }
    return maxLen;
}
export default lengthOfLongestSubstring