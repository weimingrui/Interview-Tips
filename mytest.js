/*
 * @Author: Arthur
 * @Date: 2020-07-09 14:29:09
 * @LastEditors: Arthur
 * @LastEditTime: 2020-07-09 14:38:14
 * @Description: file content
 */
var fun = function(){
    this.name = '实例化之后的name';
    fun.prototype.getNextName = function() {

    }
}  
let foo = new fun()
var keys = Object.keys(foo);
foo.hasOwnProperty('getNextName')

console.log(keys)
for (k in foo) {
    console.log(k)
}
