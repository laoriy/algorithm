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
 * 513. 找树左下角的值 Find the value of the leftmost node in the bottom level of the binary tree.
 *
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number} The value of the leftmost node in the bottom level
 */
function findBottomLeftValue(root) {
    let maxLevel = -1, result = 0
    function dfs(_root, level) {
        if (!_root) return
        if (maxLevel < level) result = _root.val  // 这一层已经有一个值了

        dfs(_root.left, level + 1)
        dfs(_root.right, level + 1)
    }

    dfs(root, 0)

    return result
};



/**
 * 
 * 135. 分发糖果

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

示例 1：

输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
示例 2：

输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 */

function candy(ratings) {
    const leftCandies = new Array(ratings.length).fill(1)
    const rightCandies = new Array(ratings.length).fill(1)
    for (let i = 0; i < ratings.length; i++) {
        let j = ratings.length - i - 1
        if (i > 0 && ratings[i] > ratings[i - 1]) {
            leftCandies[i] = leftCandies[i - 1] + 1
        }
        if (j < ratings.length - 1 && ratings[j] > ratings[j + 1]) {
            rightCandies[j] = rightCandies[j + 1] + 1
        }
    }
    let result = 0
    for (let i = 0; i < ratings.length; i++) {
        result += Math.max(leftCandies[i], rightCandies[i])
    }
    return result
};

console.log(
    candy([1, 0, 2]),
    candy([1,2,2]),
)