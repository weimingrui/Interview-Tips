/*
 * @Author: Arthur
 * @Date: 2020-07-15 15:56:34
 * @LastEditors: Arthur
 * @LastEditTime: 2020-07-15 15:58:30
 * @Description: file content
 */ 
function cb(res) {
    console.log(res)
}

function addScriptTag(src){
    let script = document.createElement('script')
    script.setAttribute("type","text/javascript")
    script.src = src
    document.body.appendChild(script)
}

window.onload = function(){
    addScriptTag("https://jsonplaceholder.typicode.com/todos?callback=cb")
}
// jquery的方法
$.ajax({
    url:"https://jsonplaceholder.typicode.com/todos?callback=?",   
    dataType:"jsonp",
    jsonpCallback:"cb",
    success: function(res){
        console.log(res)
    }
});
