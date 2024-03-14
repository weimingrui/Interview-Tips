/*
 * @Author: Arthur
 * @Date: 2020-06-07 00:58:34
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-07 00:58:35
 * @Description: new 关键字的实现
 */ 
function _new(fn, ...arg) {
    const obj = Object.create(fn.prototype);
    const ret = fn.apply(obj, arg);
    return ret instanceof Object ? ret : obj;
}