/**
 * 有两位极客玩家参与了一场「二叉树着色」的游戏。游戏中，给出二叉树的根节点 root，树上总共有 n 个节点，且 n 为奇数，其中每个节点上的值从 1 到 n 各不相同。

最开始时：

「一号」玩家从 [1, n] 中取一个值 x（1 <= x <= n）；
「二号」玩家也从 [1, n] 中取一个值 y（1 <= y <= n）且 y != x。
「一号」玩家给值为 x 的节点染上红色，而「二号」玩家给值为 y 的节点染上蓝色。

之后两位玩家轮流进行操作，「一号」玩家先手。每一回合，玩家选择一个被他染过色的节点，将所选节点一个 未着色 的邻节点（即左右子节点、或父节点）进行染色（「一号」玩家染红色，「二号」玩家染蓝色）。

如果（且仅在此种情况下）当前玩家无法找到这样的节点来染色时，其回合就会被跳过。

若两个玩家都没有可以染色的节点时，游戏结束。着色节点最多的那位玩家获得胜利 ✌️。

现在，假设你是「二号」玩家，根据所给出的输入，假如存在一个 y 值可以确保你赢得这场游戏，则返回 true ；若无法获胜，就请返回 false 。

 
示例 1 ：


输入：root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
输出：true
解释：第二个玩家可以选择值为 2 的节点。
示例 2 ：

输入：root = [1,2,3], n = 3, x = 1
输出：false
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
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var btreeGameWinningMove = function (root, n, x) {
    let leftCount = 0
    let rightCount = 0
    function dfs(node, count = null) {
        if (!node) {
            return 0
        }
        const isFind = node.val === x
        const leftC = dfs(node.left, isFind ? 0 : count)
        const rightC = dfs(node.right, isFind ? 0 : count)
        if (count !== null) count++
        if (isFind) {
            leftCount = leftC
            rightCount = rightC
        }
        return leftC + rightC + count
    }

    dfs(root)
    const otherCount = n - leftCount - rightCount - 1
    return Math.min(leftCount + rightCount + 1, leftCount + otherCount + 1, rightCount + otherCount + 1) < n / 2
};

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

const root1 = new TreeNode(1)
root1.left = new TreeNode(2)
root1.right = new TreeNode(3)
root1.left.left = new TreeNode(4)
root1.left.right = new TreeNode(5)
root1.right.left = new TreeNode(6)
root1.right.right = new TreeNode(7)
root1.left.left.left = new TreeNode(8)
root1.left.left.right = new TreeNode(9)
root1.left.right.left = new TreeNode(10)
root1.left.right.right = new TreeNode(11)

const root2 = new TreeNode(1)
root2.left = new TreeNode(2)
root2.right = new TreeNode(3)

// [1,2,3,4,5]
const root3 = new TreeNode(1)
root3.left = new TreeNode(2)
root3.right = new TreeNode(3)
root3.left.left = new TreeNode(4)
root3.left.right = new TreeNode(5)

console.log(btreeGameWinningMove(root1, 11, 3))
console.log(btreeGameWinningMove(root2, 3, 1))
console.log(btreeGameWinningMove(root3, 5, 1))