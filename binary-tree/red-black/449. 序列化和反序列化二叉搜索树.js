/* 序列化是将数据结构或对象转换为一系列位的过程，以便它可以存储在文件或内存缓冲区中，或通过网络连接链路传输，以便稍后在同一个或另一个计算机环境中重建。

设计一个算法来序列化和反序列化 二叉搜索树 。 对序列化/反序列化算法的工作方式没有限制。 您只需确保二叉搜索树可以序列化为字符串，并且可以将该字符串反序列化为最初的二叉搜索树。

编码的字符串应尽可能紧凑。

 

示例 1：

输入：root = [2,1,3]
输出：[2,1,3]
示例 2：

输入：root = []
输出：[] */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const result = []
    function postorder(root) {
        if (!root) return

        postorder(root.left)
        postorder(root.right)
        result.push(root.val)
    }
    postorder(root)

    return result.join(',')
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    if (!data) return null
    const stack = data.split(',').map(v=>Number(v))

    function buildTree(low, high) {
        if (stack.length === 0 || stack[stack.length - 1] < low || stack[stack.length - 1] > high) return null
        const val = stack.pop()
        let node = new TreeNode(val)
        node.left = buildTree(low, val)
        node.right = buildTree(val, high)

        return node

    }

    return buildTree(data)
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */ 