class Queue {
    #arr;
    #count;
    constructor(n = 10) {
        this.head = 0
        this.tail = 0
        this.#count = 0
        this.#arr = new Array(n)
        this.size = n
    }
    // 入队
    push(x) {
        if (this.full()) {
            console.error('队列满了');
        }
        this.#arr[this.tail] = x
        this.tail += 1
        this.#count += 1
        if (this.tail === this.size) this.tail = 0
    }
    // 出队
    pop() {
        if (this.empty()) return
        this.head += 1
        this.#count -= 1
        if (this.head === this.size) this.head = 0
    }
    empty() {
        return this.#count === 0
    }
    full() {
        this.#count === this.size
    }
    // 队首元素
    front() {
        if (this.empty()) return -1
        return this.#arr[this.head]
    }
    // 队尾元素
    rear() {
        if (this.empty()) return -1
        const tail = (this.tail - 1 + this.size) % this.size // 注意tail-1 才是最后一个元素
        return this.#arr[tail]
    }

    output() {
        let q = 'Queue:'

        for (let i = 0, j = this.head; i < this.#count; i++) {
            q = q + this.#arr[j] + ' ';
            j += 1
            if (j === this.size) j = 0
        }
        console.log(q);
    }

    clear() {
        this.#count = this.head = this.tail = 0
    }
}

const queue = new Queue(5)
queue.push(1)
queue.output()

queue.push(2)
queue.output()

queue.push(3)
queue.output()

queue.pop()
queue.output()

queue.push(4)
queue.output()

queue.push(5)
queue.output()

queue.pop()
queue.output()

queue.push(6)
queue.output()









