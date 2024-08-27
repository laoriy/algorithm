/**
 * 给你一个单链表的头节点 head ，请你判断该链表是否为
回文链表
。如果是，返回 true ；否则，返回 false 。

 

示例 1：


输入：head = [1,2,2,1]
输出：true
示例 2：


输入：head = [1,2]
输出：false
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
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let arr = []

    while (head) {
        arr.push(head.val)
        head = head.next
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[arr.length - i - 1]) {
            return false
        }
    }

    return true
};
