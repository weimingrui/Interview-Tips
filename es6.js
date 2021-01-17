/*
 * @Author: Arthur
 * @Date: 2020-10-14 16:33:29
 * @LastEditors: Arthur
 * @LastEditTime: 2020-10-20 15:02:17
 * @Description: file content
 */
class MyClass {
    constructor(x,y){

    }
    toString() {
        return `${this.x},${this.y}`
    }
}
class ParentClass extends MyClass{
    constructor(){
        super();
    }
}