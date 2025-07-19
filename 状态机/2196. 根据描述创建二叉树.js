/**
 * 给你一个二维整数数组 descriptions ，其中 descriptions[i] = [parenti, childi, isLefti] 表示 parenti 是 childi 在 二叉树 中的 父节点，二叉树中各节点的值 互不相同 。此外：

如果 isLefti == 1 ，那么 childi 就是 parenti 的左子节点。
如果 isLefti == 0 ，那么 childi 就是 parenti 的右子节点。
请你根据 descriptions 的描述来构造二叉树并返回其 根节点 。

测试用例会保证可以构造出 有效 的二叉树。

 

示例 1：



输入：descriptions = [[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]]
输出：[50,20,80,15,17,19]
解释：根节点是值为 50 的节点，因为它没有父节点。
结果二叉树如上图所示。
示例 2：



输入：descriptions = [[1,2,1],[2,3,0],[3,4,1]]
输出：[1,2,null,null,3,4]
解释：根节点是值为 1 的节点，因为它没有父节点。 
结果二叉树如上图所示。 
 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
    const map = new Map()
    const isChild = new Set()
    descriptions.forEach(d => {
        [parenti, childi, isLefti] = d
        const parent = map.get(parenti)
        const child = map.get(childi)
        isChild.add(childi)
        if (!parent) map.set(parenti, new TreeNode(parenti))
        if (!child) map.set(childi, new TreeNode(childi))
        if (isLefti) {
            map.get(parenti).left = map.get(childi)
        } else {
            map.get(parenti).right = map.get(childi)
        }
    })
    for (const [parenti] of descriptions) {
        if (!isChild.has(parenti)) return map.get(parenti)
    }
    return null
};

console.log(createBinaryTree([[20, 15, 1], [20, 17, 0], [50, 20, 1], [50, 80, 0], [80, 19, 1]]))
console.log(createBinaryTree([[1,2,1],[2,3,0],[3,4,1]]))