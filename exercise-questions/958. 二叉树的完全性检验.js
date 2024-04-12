/**
 * 给你一棵二叉树的根节点 root ，请你判断这棵树是否是一棵 完全二叉树 。

在一棵 完全二叉树 中，除了最后一层外，所有层都被完全填满，并且最后一层中的所有节点都尽可能靠左。最后一层（第 h 层）中可以包含 1 到 2h 个节点。
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
 * 广搜版本
 * 空间复杂度：O(n)
 * 时间复杂度：O(n)
 */
function isCompleteTree(root) {
    if (!root) return true
    const queue = [root]
    let end = false // 是否前面已经出现过一个非空节点

    while (queue.length) {
        let _root = queue.shift()
        if (!_root) {
            end = true
        } else {
            if (end) return false // 再出现就说明不是
            queue.push(_root.left)
            queue.push(_root.right)
        }

    }

    return true
};

/**
 * 左右子树个数版本
 * 一颗知道总数量的完全二叉树，其左右子树的数量肯定是固定的
 * 空间复杂度：O(n)
 * 时间复杂度：O(1)
 * 
 * 
 * 
 */

function getNodeNum(root) {
    if (!root) return 0

    const left = getNodeNum(root.left)
    const right = getNodeNum(root.right)
    return left + right + 1
}
/**
 * 
 * @param {*} root 节点
 * @param {*} n 节点总数
 * @param {*} m 倒数第二层节点数
 * @returns 
 */
function judge(root, n, m) {
    if (root === null) return n === 0
    if (n === 0) return false
    if (n === 1) return root.left === null && root.right === null
    let k = max(0, 2 * m - 1) // 三角部分总数
    let l = min(m, n - k) // 最后一层左边数量
    let r = n - k - l // 最后一层右边数量

    return judge(root.left, (k - 1) / 2 + l, m / 2) && judge(root.right, (k - 1) / 2 + r, m / 2)
}

function isCompleteTree(root) {
    if (!root) return true
    let total = getNodeNum(root)
    let m = 1/**倒数第二层节点数 */, cnt = 1/**三角部分总数量 */;
    while ((cnt + 2 * m) <= total) {
        m *= 2
        cnt += m
    }

    return judge(root, total, m)

};