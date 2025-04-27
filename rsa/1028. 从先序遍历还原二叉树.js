/**
 * 我们从二叉树的根节点 root 开始进行深度优先搜索。

在遍历中的每个节点处，我们输出 D 条短划线（其中 D 是该节点的深度），然后输出该节点的值。（如果节点的深度为 D，则其直接子节点的深度为 D + 1。根节点的深度为 0）。

如果节点只有一个子节点，那么保证该子节点为左子节点。

给出遍历输出 S，还原树并返回其根节点 root。


示例 1：
         1
       /   \
      2     5
     / \   / \
    3   4 6   7

输入："1-2--3--4-5--6--7"
输出：[1,2,5,3,4,6,7]
示例 2：

         1
       /   \
      2     5
     /     / 
    3     6
   /     / 
  4     7

输入："1-2--3---4-5--6---7"
输出：[1,2,5,3,null,6,null,4,null,7]
示例 3：

        1
       /   
      401     
     /   \ 
    349  88
   /      
  90     


输入："1-401--349---90--88"
输出：[1,401,null,349,88,90]
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 this.val = (val===undefined ? 0 : val)
 this.left = (left===undefined ? null : left)
 this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
var recoverFromPreorder = function (traversal) {
    const stack = []
    let symbolLen = 0
    let num = 0
    let root = null
    for (let i = 0; i < traversal.length; i++) {
        const str = traversal[i]
        if (str === '-') {
            num = 0
            symbolLen++
        } else {
            if (traversal[i + 1] && traversal[i + 1] !== '-') {
                num = (num * 10 + (+str || 0))
                continue;
            }
            num = (num * 10 + (+str || 0))
            node = new TreeNode(num)
            if (!root) {
                root = node
                stack.push(node)
                continue
            }

            if (symbolLen < stack.length) {
                let c = stack.length - symbolLen
                while (c--) stack.pop()
            }
            // console.log('val:', num, 'symbolLen:', symbolLen, 'stack.length:', stack.length)
            if (symbolLen === stack.length) {
                const top = stack[stack.length - 1]
                top.left ? (top.right = node) : (top.left = node)
                stack.push(node)
            }
            symbolLen = 0
        }

    }
    return JSON.stringify(root, 2)
};

console.log(recoverFromPreorder("1-2--3--4-5--6--7"))
console.log(recoverFromPreorder("1-2--3---4-5--6---7"))
console.log(recoverFromPreorder("1-401--349---90--88"))