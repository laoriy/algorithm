/* 给你一棵二叉树，它的根为 root 。请你删除 1 条边，使二叉树分裂成两棵子树，且它们子树和的乘积尽可能大。

由于答案可能会很大，请你将结果对 10^9 + 7 取模后再返回。 */

//  '../images/1339.png'

/* 输入：root = [1, 2, 3, 4, 5, 6]
输出：110
解释：删除红色的边，得到 2 棵子树，和分别为 11 和 10 。它们的乘积是 110 （11 * 10） */

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
 * @return {number}
 */
var maxProduct = function (root) {
    // 1. 计算总和total
    let total = dfs(root, 0)
    let ans = BigInt(0)

    function dfs1(node) {
        if (!node) return 0;
        const leftTotal = dfs1(node.left, sum + node.val)
        const rightTotal = dfs1(node.right, sum + node.val)

        let leftAns = BigInt(total - leftTotal) * BigInt(leftTotal)
        let rightAns = BigInt(total - rightTotal) * BigInt(rightTotal)

        // 求ans 和 leftAns和rightAns中的最大值
        ans = ans > leftAns ? ans : leftAns
        ans = ans > rightAns ? ans : rightAns
              
        return leftTotal + rightTotal + node.val
    }
    dfs1(root, 0)
    return ans % BigInt(1e9 + 7)
};

function dfs(root, sum = 0) {
    if (!root) return 0;
    return sum + root.val + dfs(root.left) + dfs(root.right);
}

