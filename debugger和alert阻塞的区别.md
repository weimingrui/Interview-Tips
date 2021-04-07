<!--
 * @Author: Arthur
 * @Date: 2021-04-02 17:26:11
 * @LastEditors: Arthur
 * @LastEditTime: 2021-04-02 17:30:14
 * @Description: file content
-->
debugger之后页面渲染会更新，但是使用alert打断执行时，页面dom的更新并不会执行
```
setTimeout(()=>{

  Promise.resolve().then(()=>{
    text.innerHTML="改变后的"
    console.log('123')
  })
  console.log('没有改变呢')

},1000)
```
alert是浏览器调用模态窗口，javascript又是单程执行的，模态窗口不退出时不会执行后续语句的，所以程序被阻塞了。
而debugger其实仅仅是触发浏览器插件工具进行执行控制，和本身javascript运行其上不在一个执行过程中了（它一点一点的喂信息给执行程序的），所以不会阻塞，而是暂停程序。不过如果喂一个alert进去，其实还会阻塞。