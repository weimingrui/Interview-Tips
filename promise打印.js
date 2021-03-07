/*
 * @Author: Arthur
 * @Date: 2021-03-07 22:33:33
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-07 22:43:46
 * @Description: file content
 */
new Promise((res,rej)=>{rej(1123)}).then(res=>{console.log('res',res);return res;},rej=>{console.log('rej1',rej);return 123}).then(res=>{console.log(res)},rej=>{console.log('rej2',rej)}).catch(err=>{console.log(err)})
// rej1 123
// 123
new Promise((res,rej)=>{rej(1123)}).then(res=>{console.log('res',res);return res;},rej=>{console.log('rej1',rej);throw new Error(123);return 'rej1'}).then(res=>{console.log('res2',res)},rej=>{console.log('rej2',rej)}).catch(err=>{console.log('err',err)})
// rej1 1123
// rej2 Error: 123
//     at <anonymous>:1:120
new Promise((res,rej)=>{rej(1123)}).then(res=>{console.log('res',res);return res;},rej=>{console.log('rej1',rej);return 123}).then(res=>{console.log('res2',res)},rej=>{console.log('rej2',rej)}).catch(err=>{console.log('err',err)})
// rej1 1123
// res2 123
new Promise((res,rej)=>{rej(1123)}).then(res=>{console.log('res',res);return res;},rej=>{console.log('rej1',rej);throw new Error(123);return 'rej1'}).then(res=>{console.log('res2',res)}).catch(err=>{console.log('err',err)})
// rej1 1123
// err Error: 123
//     at <anonymous>:1:120
Promise.all([function(){let reject =null;new Promise(res,rej=>{reject=rej});reject('my reject')}, 345]).then(res=>console.log('res',res),rej=>console.log('rej',rej)).catch(err=>console.log('err',err))
// res (2) [ƒ, 345]

Promise.all([new Promise((res,rej)=>{rej('testreject')}), 345]).then(res=>console.log('res',res),rej=>console.log('rej',rej)).catch(err=>console.log('err',err))
//rej testreject
Promise.all([2342,new Promise((res,rej)=>{rej('testreject')}), 345]).then(res=>console.log('res',res),rej=>console.log('rej',rej)).catch(err=>console.log('err',err))
// rej testreject
Promise.all([2342,new Promise((res,rej)=>{rej('testreject')}), 345]).then(res=>console.log('res',res)).catch(err=>console.log('err',err))
// err testreject
Promise.all([2342,new Promise((res,rej)=>{res('testreject')}), new Error(1)]).then(res=>console.log('res',res)).catch(err=>console.log('err',err))
// res (3) [2342, "testreject", Error: 1
//     at <anonymous>:1:64]
Promise.all([2342,new Promise((res,rej)=>{res('testreject')}), function(){throw new Error(1)}]).then(res=>console.log('res',res)).catch(err=>console.log('err',err))
// res (3) [2342, "testreject", ƒ]
Promise.all([2342,new Promise((res,rej)=>{res('testreject')}), new Promise((res,rej)=>{throw new Error(123);res('testreject')})]).then(res=>console.log('res',res)).catch(err=>console.log('err',err))
// err Error: 123
//     at <anonymous>:1:94
//     at new Promise (<anonymous>)
//     at <anonymous>:1:64
Promise.all([2342,new Promise((res,rej)=>{res('testreject')}), new Promise((res,rej)=>{throw new Error(123);res('testreject')})]).then(res=>console.log('res',res),rej=>console.log('rej',rej)).catch(err=>console.log('err',err))
// rej Error: 123
//     at <anonymous>:1:94
//     at new Promise (<anonymous>)
//     at <anonymous>:1:64
