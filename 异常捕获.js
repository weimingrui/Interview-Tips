/*
 * @Author: Arthur
 * @Date: 2021-04-02 17:20:50
 * @LastEditors: Arthur
 * @LastEditTime: 2021-04-02 17:25:09
 * @Description: file content
 */
/* 异常捕获的方法一般是说 onerror,try{}catch(e){}finally{},
try catch捕获异常之后不在抛出异常的话，onerror不会再次捕获异常
以上方法都无法捕获promise中的异常，promise的异常可以通过catch()或者then(null,function(error){})捕获
*/
window.onerror = function(msg,url,line){
    console.log('msg',msg,url,line)
}
try{
    throw Error('test');
}catch(e) {
    console.log('catch',e)
}
// 输出 catch test