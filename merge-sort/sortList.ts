/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
// 归并排序
function mergeList (l:ListNode,r:ListNode) {
    let dummy = new ListNode()
    let pre = dummy
    while(l && r){
        if(l.val < r.val){
            pre.next = l
            l = l.next
        }  else {
            pre.next = r
            r = r.next
        }
        pre = pre.next
    }
    if(l) pre.next = l
    if(r) pre.next = r
    
    return dummy.next
}   


function sortList(head: ListNode | null): ListNode | null {

    if(!head || !head.next) return head
    // 首先是要断链，分成两个链

    let slow = head
    let fast = head
    let preSlow = null
    while(fast && fast.next){
        preSlow = slow
        slow = slow.next
        fast = fast.next.next
    }
    preSlow.next = null

    const  l = sortList(head)
    const r = sortList(slow)
    const merged = mergeList(l,r)
    return merged
};