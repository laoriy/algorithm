/**
 * 大小顶堆
 */
class Heap {
    constructor(type = 'max') {
        this.type = type
        this.heap = []
        this.ctn = 0
        this._compare = (a,b) => type == 'min' ? a >  b : a < b
        this.setCompare((a,b)=>[a,b])
    }
    setCompare(fn) {
        this.compare = (a, b) => {
            const [a1,b1] = fn(a, b)
            return this._compare(a1,b1)
        }
    }

    /**
     * 交换位置
     */
    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }
    /**
     * 从index开始向上调整
     */
    shift_up(index) {
        // 父节点坐标为i时，子节点分别为2i + 1 及2i+2
        // 向上调整，根据子节点坐标获取父节点坐标。（子节点坐标 - 1）/ 2 = i
        while (index && this.compare(this.heap[Math.floor((index - 1) / 2)],this.heap[index])) {

            let parentIdx = Math.floor((index - 1) / 2)
            this.swap(index, parentIdx)
            index = parentIdx
        }
    }
    /**
     * 从index开始向下调整
     */
    shift_down(idx) {
        // 向下调整
        let n = this.ctn - 1;
        while (idx * 2 + 1 <= n) { // 一定有子节点
            let temp = idx
            if (this.compare(this.heap[temp], this.heap[idx * 2 + 1])) temp = idx * 2 + 1;
            if (idx * 2 + 2 <= n) { // 有右子树
                if (this.compare(this.heap[temp],this.heap[idx * 2 + 2])) temp = idx * 2 + 2;
            }
            if (temp === idx) break;

            this.swap(idx, temp)
            idx = temp;
        }
    }

    _push(x) {
        this.heap[this.ctn++] = x
        let index = this.ctn - 1;

        this.shift_up(index)

    }

    _pop() {
        if (this.size() === 0) return
        this.swap(0, this.ctn - 1)
        this.ctn -= 1
        this.shift_down(0)
    }

    top() {
        return this.heap[0]
    }

    size() {
        return this.ctn
    }

    push(x) {
        this._push(x)
    }
    pop() {
        this._pop()
    }
    output() {
        return this.heap.slice(0, this.ctn)
    }
}



const maxHeap = new Heap()
maxHeap.push(3)
maxHeap.push(2)
maxHeap.push(1)
maxHeap.push(4)
maxHeap.push(5)

console.log(maxHeap.output());
maxHeap.pop()

console.log(maxHeap.output());



const minHeap = new Heap('min')
minHeap.push(3)
minHeap.push(2)
minHeap.push(1)
minHeap.push(4)
minHeap.push(5)

console.log(minHeap.output());
minHeap.pop()

console.log(minHeap.output());










