/*
 * @Author: Arthur
 * @Date: 2020-06-05 16:44:00
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-05 16:48:16
 * @Description: dom的遍历方式:
 * 顾名思义，对顶点A的未被访问过的领节点进行探索，
 * 然后继续探索未被探索的领节点的领节点，
 * 可以理解为逐层探索，直至这一层被探索完毕，探索下一层，
 * 往复上述操作，直至全部探索完毕.
 *  访问过程：
    访问顶点V1
    访问V1的所有未被访问的领接点V2,V3....
    依次类推，知道全部被探索过为止
 */ 
// html结构如下：

// <div class="parent">
//   <div class="child-1">
//     <div class="child-1-1">
//       <div class="child-1-1-1">
//         a
//      </div>
//     </div>
//     <div class="child-1-2">
//       <div class="child-1-2-1">
//         b
//      </div>
//     </div>
//     <div class="child-1-3">
//       c
//     </div>
//   </div>
//   <div class="child-2">
//     <div class="child-2-1">
//       d
//     </div>
//     <div class="child-2-2">
//       e
//     </div>
//   </div>
//   <div class="child-3">
//     <div class="child-3-1">
//       f
//     </div>
//   </div>
// </div>
let widthTraversal2 = (node) => {
    let nodes = []
    let stack = []
    if (node) {
        stack.push(node)
        while (stack.length) {
            let item = stack.shift()
            let children = item.children
            nodes.push(item)
            // 队列，先进先出
            // nodes = [] stack = [parent]
            // nodes = [parent] stack = [child1,child2,child3]
            // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
            // nodes = [parent,child1,child2]
            for (let i = 0; i < children.length; i++) {
                stack.push(children[i])
            }
        }
    }
    return nodes
}