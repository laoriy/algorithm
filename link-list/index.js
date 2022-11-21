// 链表实现1：
(function linkList() {
    class Node {
        constructor(data) {
            this.data = data
            this.next = null
        }
    }
    const head = new Node(1)
    head.next = new Node(2)
    head.next.next = new Node(3)
    head.next.next.next = new Node(4)
    let p = head
    while (p !== null) {
        console.log(p.data, '->');
        p = p.next
    }
})();

// 链表实现2：
(function linkList() {
    const data = new Array(10).fill(0)
    const next = new Array(10).fill(0)

    function add(index, p, val) {
        next[p] = next[index]
        next[index] = p
        data[p] = val

    }
    data[3] = 0
    add(3, 5, 1)
    add(5, 2, 2)
    add(2, 7, 3)
    add(7, 9, 100)
    add(5, 6, 4)
    let p = 3
    while (p !== 0) {
        console.log(data[p], '->');
        p = next[p]
    }
    console.log(data, next);
})();



// 链表反转：
(function linkList3() {
    // 前n个节点进行反转
    function reverseN(head, n) {
        if (n === 1) return head
        const tail = head.next
        const p = reverseN(head.next, n - 1)
        head.next = tail.next
        tail.next = head
        return p
    }

    class Node {
        constructor(data) {
            this.data = data
            this.next = null
        }
    }
    let head = new Node(1)
    head.next = new Node(2)
    head.next.next = new Node(3)
    head.next.next.next = new Node(4)
    head.next.next.next.next = new Node(5)

    // 反转
    // console.log('反转--')

    // head = reverseN(head, 2)
    // let p = head
    // while (p !== null) {
    //     console.log(p.data, '->');
    //     p = p.next
    // }


    function reverseBetween(head, m, n) {
        const virtualNode = new Node('d') // 添加一个虚拟的头结点
        virtualNode.next = head
        const count = n - m + 1 // 需要反转的节点数
        let p = virtualNode

        while (--m) {
            p = p.next
        }
        p.next = reverseN(p.next, count)
        return virtualNode.next
    }
    reverseBetween(head,2,4)

     let p = head
    while (p !== null) {
        console.log(p.data, '->');
        p = p.next
    }
})();

