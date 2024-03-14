/*
 * @Author: Arthur
 * @Date: 2021-03-07 19:32:54
 * @LastEditors: Arthur
 * @LastEditTime: 2021-03-07 21:45:47
 * @Description: file content
 */
const PENDING = 'pendind';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function myPromise() {
    const that = this;
    that.status = PENDING;
    that.value = null;
    that.reason = null;
    that.resolvedCallbacks = [];
    that.rejectedCallbacks = [];
    function resolve(value) {
        if (that.status === PENDING) {
            that.status = RESOLVED;
            that.value = value;
            that.resolvedCallbacks.map(cb=>cb(value))
        }
    }
    function reject(reason) {
        that.status = REJECTED;
        that.reason = reason;
        that.rejectedCallbacks.map(cb=>cb(reason));
    }
    try {
        fn(resolve,reject);
    }catch(err){
        reject(err);
    }
}
myPromise.prototype.then = function(onFufilled,onRejected) {
    const that = this;
    if (that.status === PENDING) {
        that.rejectedCallbacks.push(onFufilled);
        that.rejectedCallbacks.push(onRejected);
    }
    if (that.status === RESOLVED) {
        onFufilled(that.value);
    }
    if (that.status === REJECTED) {
        onRejected(that.reason);
    }
    return that;
}