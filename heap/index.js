class Heap {
    constructor() {
        this.heap = []
        this.ctn = 0
    }
    swap(i, j) {
        let temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }
    shift_up(index) {
        // 父节点坐标为i时，子节点分别为2i + 1 及2i+2
        // 向上调整，根据子节点坐标获取父节点坐标。（子节点坐标 - 1）/ 2 = i
        while (index && this.heap[Math.floor((index - 1) / 2)] < this.heap[index]) {

            let parentIdx = Math.floor((index - 1) / 2)
            this.swap(index, parentIdx)
            index = parentIdx
        }
    }
    shift_down(idx) {
        // 向下调整
        let n = this.ctn - 1;
        while (idx * 2 + 1 <= n) { // 一定有子节点
            let temp = idx
            if (this.heap[temp] < this.heap[idx * 2 + 1]) temp = idx * 2 + 1;
            if (idx * 2 + 2 <= n) { // 有右子树
                if (this.heap[temp] < this.heap[idx * 2 + 2]) temp = idx * 2 + 2;
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
        console.log('push ' + x + ' to heap', this.heap);
    }
    pop() {
        console.log('pop ' + this.top() + ' from heap');
        this._pop()
        console.log(new Array(this.size()).fill(null).map((v, inx) => this.heap[inx]));
    }
    output(){
        return console.log(this.heap); // 排好序的--堆排序
    }
}




const heap = new Heap()
heap.push(5)
heap.push(1)
heap.push(3)
heap.push(9)
heap.push(7)
heap.push(6)
heap.push(4)

heap.pop()
heap.pop()
heap.pop()
heap.pop()
heap.pop()
heap.pop()
heap.pop()

heap.output()





