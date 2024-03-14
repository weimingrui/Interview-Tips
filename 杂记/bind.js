/*
 * @Author: Arthur
 * @Date: 2021-03-07 23:24:37
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-08 00:33:48
 * @Description: file content
 */
Function.prototype.myBind = function(context = globalThis){
    const fn = this;
    // 获取该方法剩余参数
    // 当目标函数被调用时，被预置入绑定函数的参数列表中的参数。
    const otherArg = [...arguments].slice(1);
    // 设置返回的一个新方法
    const result = function() {
        // 获取返回方法体的参数
        const resultArg = [...arguments];
        // 调用绑定函数时作为 this 参数传递给目标函数的值。 如果使用new运算符构造绑定函数，
        // 则忽略context。当使用 bind 在 setTimeout 中创建一个函数（作为回调提供）时，
        // 作为 context 传递的任何原始值都将转换为 object。如果 bind 函数的参数列表为空，
        // 或者context是null或undefined，执行作用域的 this 将被视为新函数的 thisArg
        if (this instanceof result) {
            return fn.apply(this, [...otherArg,...resultArg]);
        } else {
            // 否则普通函数形式绑定 context
            return  fn.apply(context, [...otherArg,...resultArg]);
        }
    }
    result.prototype = Object.create(fn.prototype);
    return result;
}
obj = {
 fn:function () {
    this.a = 2;
    console.log(this.a);
    function name(params) {
        console.log(this)
    }
    return name;
}}

newfn = fn.myBind(fn);
fn();