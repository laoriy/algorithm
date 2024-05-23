/**
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

    有效 二叉搜索树定义如下：

    节点的左
    子树
    只包含 小于 当前节点的数。
    节点的右子树只包含 大于 当前节点的数。
    所有左子树和右子树自身必须也是二叉搜索树。
 * 
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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    let pre = Number.MIN_SAFE_INTEGER
    let ans = true
    function dfs(root) {
        if (root === null || !ans) return
        dfs(root.left)
        if (root.val <= pre) {
            ans = false
            return
        }
        pre = root.val
        dfs(root.right)
    }
    dfs(root)
    return ans
};