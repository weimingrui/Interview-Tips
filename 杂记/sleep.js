/*
 * @Author: Arthur
 * @Date: 2020-05-24 22:05:35
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-07 00:58:51
 * @Description: 模拟sleep ，
 * 主要是利用promise 的状态不受外界影响实现， await ，和构造函数也可以实现
 */ 

function sleep (ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms)
    })
  }
  
  sleep(1000).then(()=>{
    console.log('已经 sleep 1000ms')
  })
  
  function sleep (ms) {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms)
    })
  }
  
  // 使用async/await调用
  async function test () {
    var example = await sleep(1000)
    console.log('已经 sleep 1000ms')
  }
  // 使用 generator 定义 sleep 函数
function *sleep (ms) {
    yield new Promise((resolve) => {
      window.setTimeout(resolve, ms)
    })
  }
  sleep(1000).next().value.then(()=>{
    console.log('已经 sleep 1000ms')
  })
  
  