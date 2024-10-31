/**
 * 给你二叉树的根结点 root ，请你设计算法计算二叉树的 垂序遍历 序列。

对位于 (row, col) 的每个结点而言，其左右子结点分别位于 (row + 1, col - 1) 和 (row + 1, col + 1) 。树的根结点位于 (0, 0) 。

二叉树的 垂序遍历 从最左边的列开始直到最右边的列结束，按列索引每一列上的所有结点，形成一个按出现位置从上到下排序的有序列表。如果同行同列上有多个结点，则按结点的值从小到大进行排序。

返回二叉树的 垂序遍历 序列。

 输入：root = [3,9,20,null,null,15,7]
输出：[[9],[3,15],[20],[7]]
解释：
列 -1 ：只有结点 9 在此列中。
列  0 ：只有结点 3 和 15 在此列中，按从上到下顺序。
列  1 ：只有结点 20 在此列中。
列  2 ：只有结点 7 在此列中。

输入：root = [1,2,3,4,5,6,7]
输出：[[4],[2],[1,5,6],[3],[7]]
解释：
列 -2 ：只有结点 4 在此列中。
列 -1 ：只有结点 2 在此列中。
列  0 ：结点 1 、5 和 6 都在此列中。
          1 在上面，所以它出现在前面。
          5 和 6 位置都是 (2, 0) ，所以按值从小到大排序，5 在 6 的前面。
列  1 ：只有结点 3 在此列中。
列  2 ：只有结点 7 在此列中。

输入：root = [1,2,3,4,6,5,7]
输出：[[4],[2],[1,5,6],[3],[7]]
解释：
这个示例实际上与示例 2 完全相同，只是结点 5 和 6 在树中的位置发生了交换。
因为 5 和 6 的位置仍然相同，所以答案保持不变，仍然按值从小到大排序。
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
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
    const ans = []
    const obj = {}

    function dfs(node, x, y) {
        if (!node) return
        // 如果x方向没有值，就初始化一个
        if (!obj[x]) obj[x] = []
        // 如果x方向已经有值了，就看这个x位置有没有y值
        obj[x].push([y, node.val])

        dfs(node.left, x - 1, y + 1)
        dfs(node.right, x + 1, y + 1)
    }
    dfs(root, 0, 0)
    const sortKeys = Object.keys(obj).sort((a, b) => a - b)
    sortKeys.forEach(x => {
        obj[x].sort((a, b) => {
            if (a[0] !== b[0]) {
                return a[0] - b[0]
            } else {
                return a[1] - b[1]
            }
        })
        ans.push(obj[x].map(item => item[1]))
    })
    return ans
};

const root = {
    val: 3,
    left: { val: 9 },
    right: {
        val: 20,
        left: { val: 15 },
        right: { val: 7 }
    }
}

console.log(verticalTraversal(root));