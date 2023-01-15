class Stack {
    #arr;
    constructor(size = 100) {
        this.#arr = new Array(size)
        this.top = -1
    }
    push(data) {
        this.top++
        this.#arr[this.top] = data
    }
    pop() {
        if (this.empty()) {
            return
        }
        this.top--
    }
    empty() {
        return this.top === -1
    }
    size() {
        return this.top + 1
    }
    output() {
        for (let i = this.top; i >= 0; i--) {
            console.log(this.#arr[i]);
        }
        console.log('=====');

    }
}



const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)
stack.output()
stack.pop()
stack.output()
stack.push(4)
stack.output()
stack.push(5)
stack.output()
stack.pop()
stack.output()













