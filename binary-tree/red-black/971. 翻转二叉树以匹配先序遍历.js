/* 给你一棵二叉树的根节点 root ，树中有 n 个节点，每个节点都有一个不同于其他节点且处于 1 到 n 之间的值。

另给你一个由 n 个值组成的行程序列 voyage ，表示 预期 的二叉树 先序遍历 结果。

通过交换节点的左右子树，可以 翻转 该二叉树中的任意节点。例，翻转节点 1 的效果如下：


请翻转 最少 的树中节点，使二叉树的 先序遍历 与预期的遍历行程 voyage 相匹配 。 

如果可以，则返回 翻转的 所有节点的值的列表。你可以按任何顺序返回答案。如果不能，则返回列表 [-1]。

 



输入：root = [1,2], voyage = [2,1]
输出：[-1]
解释：翻转节点无法令先序遍历匹配预期行程。 */

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
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
    const ret = []
    let index = 0
    // 判断每一位值是否匹配
    function dfs(node) {
        if (!node) return true;
        if (node.val !== voyage[index++]) return false; // 节点值不匹配
        if (node.left && node.left.val !== voyage[index]) { // 进行翻转
            const left = node.left
            const right = node.right
            node.left = right
            node.right = left
            ret.push(node.val)
        }
        if (!dfs(node.left)) return false;
        if (!dfs(node.right)) return false;
        return true
    }

    return dfs(root, 0) ? ret : [-1]
};