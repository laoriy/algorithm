/**
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）
 */

// 题解： 深搜，以每个节点为开始进行深搜。其中每个节点深搜过程中判断是否满足条件即可



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
 * @param {number} targetSum
 * @return {number}
 */


function dfs(root, target) {
    let ret = 0
    if (!root) return 0
    if (root.val === target) {
        ret += 1
    }
    ret += dfs(root.left, target - root.val)
    ret += dfs(root.right, target - root.val)
    return ret;
}
var pathSum = function (root, targetSum) {
    if (!root) return 0
    return dfs(root, targetSum) + pathSum(root.left, targetSum) + pathSum(root.right, targetSum)
};



var pathSum2 = function (root, targetSum) {
    const prefixSumMap = new Map()
    prefixSumMap.set(0, 1)

    function dfs(root, curr) {
        if (!root) return 0
        let ret = 0

        curr += root.val

        ret = prefixSumMap.get(curr - targetSum) || 0 // 从根结点到当前节点之前  有个前缀和为 curr(当前节点前缀和) - targetSum 的 节点， 那么从该节点到当前节点和一定为targetSum
        prefixSumMap.set(curr, (prefixSumMap.get(curr) || 0) + 1);
        ret += dfs(root.left, curr, targetSum);
        ret += dfs(root.right, curr, targetSum);
        prefixSumMap.set(curr, (prefixSumMap.get(curr) || 0) - 1);
        return ret;
    }

    return dfs(root, 0)
};
