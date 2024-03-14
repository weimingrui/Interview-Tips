/*
 * @Author: Arthur
 * @Date: 2020-05-24 21:54:06
 * @LastEditors: Arthur
 * @LastEditTime: 2020-05-24 21:54:50
 * @Description:dom  once 事件的实现
 */ 

function once (func) {
  var done;
  return function () {
    if (!done) {
      func.apply(null, arguments)
      done = true
    }
  }
}
