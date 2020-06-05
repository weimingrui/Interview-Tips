/*
 * @Author: Arthur
 * @Date: 2020-06-05 14:52:22
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-05 16:05:46
 * @Description: file content
 */ 
/**
* 防抖工厂
* @param {Function} fn 需要防抖的函数
* @param {Date} time 时间间隔，默认500ms
* @returns {Function}
*/
function debounce(fn, time = 500) {
    let timer = null;
    return function(...rest){
        clearTimeout(timer);
        timer = setTimeout(() => {
        fn.apply(this, rest);
        },time)
    }
}

/**
 * 节流工厂
 * @param {Function} fn 需要节流的函数
 * @param {Date} time 时间间隔，默认500ms
 * @returns {Function}
 */
function throttle(fn, time = 500) {
    let startTime = new Date();
    return function (...rest) {
        let time_ = (new Date() - startTime) >= time;
        if(!time_)return;
        fn.apply(this, rest);
        startTime = new Date();
    }
}