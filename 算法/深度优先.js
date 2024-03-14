/*
 * @Author: Arthur
 * @Date: 2020-06-05 16:46:53
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-05 16:48:51
 * @Description: 深度优先 对顶点A未被访问过的一个领节点进行深度探索，
 * 直到没有路径位置，此时进行回溯，
 * 在去探索A的其他未被探索的领节点，然后一直重复上述操作，
 * 直至全部被探索完毕为止。
 * 访问过程：A->B->E（没有路了！回溯到A)->C->F->H->G->D（没有路，最终回溯到A,A也没有未访问的相邻节点，本次搜索结束）
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

let deepTraversal1 = (node, nodeList = []) => {
    if (node !== null) {
        nodeList.push(node)
        let children = node.children
        for (let i = 0; i < children.length; i++) {
            deepTraversal1(children[i], nodeList)
        }
    }
    return nodeList
}

let deepTraversal2 = (node) => {
    let nodes = []
    if (node !== null) {
        nodes.push(node)
        let children = node.children
        for (let i = 0; i < children.length; i++) {
        nodes = nodes.concat(deepTraversal2(children[i]))
        }
    }
    return nodes
}