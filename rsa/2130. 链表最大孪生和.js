/**
 * 在一个大小为 n 且 n 为 偶数 的链表中，对于 0 <= i <= (n / 2) - 1 的 i ，第 i 个节点（下标从 0 开始）的孪生节点为第 (n-1-i) 个节点 。

比方说，n = 4 那么节点 0 是节点 3 的孪生节点，节点 1 是节点 2 的孪生节点。这是长度为 n = 4 的链表中所有的孪生节点。
孪生和 定义为一个节点和它孪生节点两者值之和。

给你一个长度为偶数的链表的头节点 head ，请你返回链表的 最大孪生和 。
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
    let quick = head;
    let slow = head;

    while (quick) {
        quick = quick.next.next;
        slow = slow.next;
    }
    // 这时候从slow 开始的就是后半段的链表

    let node = null
    function getMax(head, dfsHead) {
        if (!dfsHead) {
            node = head;
            return 0
        }
        let ans = getMax(head, dfsHead.next)
        ans = Math.max(ans, node.val + dfsHead.val)
        node = node.next
        return ans
    }

    return getMax(head, slow)
};