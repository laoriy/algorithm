class Node1 {
    key: number;
    value: number;
    prev: Node1 | null;
    next: Node1 | null;
    constructor(key: number = 0, value: number = 0) {
        this.key = key;
        this.value = value;
        this.prev = null
        this.next = null
    }
    removeThis() {
        if (this.prev) this.prev.next = this.next;
        if (this.next) this.next.prev = this.prev;
        this.next = this.prev = null
    }
}

class LRUCache {
    capacity: number;
    dummy: Node1;
    keyToNode: Map<number, Node1>;
    constructor(capacity: number) {
        this.capacity = capacity;
        this.dummy = new Node1(); // 哨兵节点
        this.dummy.prev = this.dummy;
        this.dummy.next = this.dummy;
        this.keyToNode = new Map();
    }

    getNode(key) {
        if (!this.keyToNode.has(key)) { // 没有这本书
            return null;
        }
        const node = this.keyToNode.get(key); // 有这本书
        node?.removeThis(); // 把这本书抽出来
        this.pushFront(node); // 放在最上面
        return node;
    }

    get(key) {
        const node = this.getNode(key);
        return node ? node.value : -1;
    }

    put(key: number, value: number) {
        let node = this.getNode(key);
        if (node) { // 有这本书
            node.value = value; // 更新 value
            return;
        }
        node = new Node1(key, value) // 新书
        this.keyToNode.set(key, node);
        this.pushFront(node); // 放在最上面
        if (this.keyToNode.size > this.capacity) { // 书太多了
            const backNode = this.dummy.prev;
            this.keyToNode.delete(backNode!.key);
            backNode?.removeThis(); // 去掉最后一本书
        }
    }

    // 在链表头添加一个节点（把一本书放在最上面）
    pushFront(x) {
        x.prev = this.dummy;
        x.next = this.dummy.next;
        x.prev.next = x;
        x.next.prev = x;
    }

}