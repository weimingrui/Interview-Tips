/*
 * @Author: Arthur
 * @Date: 2021-03-07 22:49:06
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-07 23:35:27
 * @Description: file content
 */
class Scheduler {
    constructor(maxNum) {
        this.taskList = [];
        this.counter = 0;
        this.maxNum = maxNum;
    }
    async add(promiseCreater) {
        if (this.counter >= this.maxNum) {
            await new Promise((resolve,reject)=>{
                this.taskList.push(resolve);
            })
        }
        this.counter ++;
        const result = await promiseCreater();
        this.counter--;
        if (this.taskList.length) {
            this.taskList.shift();
        }
        return result;
    }
}