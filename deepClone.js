/*
 * @Author: Arthur
 * @Date: 2020-06-05 16:53:00
 * @LastEditors: Arthur
 * @LastEditTime: 2020-06-05 17:22:33
 * @Description: 用深度优先思想和广度优先思想实现一个拷贝函数
 */ 
//工具函数
let _toString = Object.prototype.toString
let map = {
    array: 'Array',
    object: 'Object',
    function: 'Function',
    string: 'String',
    null: 'Null',
    undefined: 'Undefined',
    boolean: 'Boolean',
    number: 'Number'
}
let getType = (item) => {
    return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
    return map[type] && map[type] === getType(item)
}
// 深度优先copy
let DFSdeepClone = (obj, visitedArr = []) => {
    let _obj = {}
    if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
        let index = visitedArr.indexOf(obj)
        _obj = isTypeOf(obj, 'array') ? [] : {}
        if (~index) { // 判断环状数据
            _obj = visitedArr[index]
        } else {
            visitedArr.push(obj)
            for (let item in obj) {
                _obj[item] = DFSdeepClone(obj[item], visitedArr)
            }
        }
    } else if (isTypeOf(obj, 'function')) {
        _obj = eval('(' + obj.toString() + ')');
    } else {
        _obj = obj
    }
    return _obj
}

// 广度优copy
// clone思维： 主要是利用所有 对象都有索引指向 这个关键，来进行遍历clone，
let BFSdeepClone = (obj) => {
    let origin = [obj],
        copyObj = {},
        copy = [copyObj] // 待遍历的对象
        // 去除环状数据
        let visitedQueue = [],
        visitedCopyQueue = [];
        while (origin.length > 0) {
            let items = origin.shift(),
                _obj = copy.shift(); // 遍历copy对象的key-value,一步步完成 ,_obj的索引已经指向copyObj
            visitedQueue.push(items);
            if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
                for (let item in items) {
                    let val = items[item]
                    if (isTypeOf(val, 'object')) {
                        let index = visitedQueue.indexOf(val)
                        if (!~index) {
                            _obj[item] = {}
                                //下次while循环使用给空对象提供数据
                            origin.push(val)
                                // 推入引用对象
                            copy.push(_obj[item])  // copy里的元素也是指向copyObj
                        } else {
                            _obj[item] = visitedCopyQueue[index]
                            visitedQueue.push(_obj)
                        }
                    } else if (isTypeOf(val, 'array')) {
                        // 数组类型在这里创建了一个空数组
                        _obj[item] = []
                        origin.push(val)
                        copy.push(_obj[item])
                    } else if (isTypeOf(val, 'function')) {
                        _obj[item] = eval('(' + val.toString() + ')');
                    } else {
                        _obj[item] = val
                    }
                }
                // 将已经处理过的对象数据推入数组 给环状数据使用
                visitedCopyQueue.push(_obj)
            } else if (isTypeOf(items, 'function')) {
                copyObj = eval('(' + items.toString() + ')');
            } else {
                copyObj = obj
            }
        }
    return copyObj
}