/**
 * 155. 最小栈

设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。
 

示例 1:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
 */

class MinStack {
    minStack
    arr
    constructor() {
        this.minStack = []
        this.arr = []
    }

    push(val) {
        this.arr.push(val)
        // this.minStack.push(Math.min(this.minStack[this.minStack.length - 1] ?? Infinity, val))
       if(this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]){
            this.minStack.push(val)
       }
    }

    pop() {
        this.arr.pop()
        // this.minStack.pop()
        if(v === this.minStack[this.minStack.length - 1]){
            this.minStack.pop()
        }
    }

    top() {
        return this.arr[this.arr.length - 1]
    }

    getMin() {
        return this.minStack[this.minStack.length - 1]
    }
}

var obj = new MinStack()
obj.push(-2)
obj.push(0)
obj.push(-3)
console.log(obj.getMin())
obj.pop()
console.log(obj.top())
console.log(obj.getMin())
