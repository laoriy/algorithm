/**
 * 将一个 二叉搜索树 就地转化为一个 已排序的双向循环链表 。

对于双向循环列表，你可以将左右孩子指针作为双向循环链表的前驱和后继指针，第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。

特别地，我们希望可以 就地 完成转换操作。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继。还需要返回链表中最小元素的指针。
 */

// 中序遍历


/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
    if (!root) return null
    let head = null
    let pre = null
    function dfs(root) {
        if (!root) return
        dfs(root.left)
        // 中序遍历中间做一些事情,这里会从小到大依次遍历每个节点
        if (pre === null) {
            head = root
        } else {
            pre.right = root
        }
        root.left = pre
        pre = root

        dfs(root.right)
    }
    dfs(root)
    // 最后连接首尾
    head.left = pre
    pre.right = head;

    return head;
};