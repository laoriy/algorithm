/**
 * 给你一棵以 root 为根的二叉树和一个 head 为第一个节点的链表。

如果在二叉树中，存在一条一直向下的路径，且每个点的数值恰好一一对应以 head 为首的链表中每个节点的值，那么请你返回 True ，否则返回 False 。

一直向下的路径的意思是：从树中某个节点开始，一直连续向下的路径

 * 
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

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Check if the given linked list is a subpath of the binary tree.
 *
 * @param {ListNode} head - the head of the linked list
 * @param {TreeNode} root - the root of the binary tree
 * @return {boolean} true if the linked list is a subpath of the binary tree, false otherwise
 */

function dfs(root, head) {
    if (!head) return true;
    if (!root) return false;
    if (root.val !== head.val) return false
    return dfs(root.left, head.next) || dfs(root.right, head.next)

}
function isSubPath(head, root) {
    if (!root) return false
    return dfs(root, head) || isSubPath(root.left, head) || isSubPath(root.right, head)
};