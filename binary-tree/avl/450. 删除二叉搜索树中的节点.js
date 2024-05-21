/**
 * 
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

一般来说，删除节点可分为两个步骤：

首先找到需要删除的节点；
如果找到了，删除它。

输入: root = [5,3,6,2,4,null,7], key = 3

      5
     / \
    3   6
   / \   \
  2   4   7

输出：
      5
     / \
    4   6
   /     \
  2       7

 */

/**
* Definition for a binary tree node.
* function TreeNode(val, left, right) {
*     this.val = (val===undefined ? 0 : val)
*     this.left = (left===undefined ? null : left)
*     this.right = (right===undefined ? null : right)
* }
*/

/**
    * @param {TreeNode} node
    */
function findMinNode(node) {
    while (node.left) {
        node = node.left
    }
    return node
}

function _delete(root, key) {
    if (!root) return null

    if (root.val === key) { // 找到了要删除的节点
        if (!root.left && !root.right) { // 没有子节点
            return null
        } else if (!root.left) {  // 没有左子节点
            return root.right
        } else if (!root.right) { // 没有右子节点
            return root.left
        } else {
            let temp = findMinNode(root.right) //在右子树找到一个最小节点，也就是当前节点的后继节点。
            root.val = temp.val
            root.right = _delete(root.right, temp.val)
        }
    } else if (key < root.val) {
        root.left = _delete(root.left, key)
    } else {
        root.right = _delete(root.right, key)
    }


    return root
}



/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    return _delete(root, key)
};



