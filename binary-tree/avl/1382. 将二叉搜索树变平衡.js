/**
 * 给你一棵二叉搜索树，请你返回一棵 平衡后 的二叉搜索树，新生成的树应该与原来的树有着相同的节点值。如果有多种构造方法，请你返回任意一种。

    如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是 平衡的 。
 */


/**
 * 示例 1：
 * 
 * 

输入：

1
 \
  2
   \
    3
     \
      4
 输出：
   2
  / \
 1   3
      \
       4

    输入：root = [1,null,2,null,3,null,4,null,null]
    输出：[2,1,3,null,null,null,4]
    解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案。
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

function getHeight(node) {
    if (node === null) {
        return 0;
    }
    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function rotateLeft(node) {
    let newNode = node.right
    node.right = newNode.left
    newNode.left = node
    return newNode
}

function rotateRight(node) {
    let newNode = node.left
    node.left = newNode.right
    newNode.right = node
    return newNode
}

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function (root) {
    if (!root) return null

    root.left = balanceBST(root.left)
    root.right = balanceBST(root.right)
    // 判断节点的平衡性
    let lHeight = getHeight(root.left)
    let rHeight = getHeight(root.right)
    let heighDiff = Math.abs(lHeight - rHeight)
    if (heighDiff > 1) {
        // 不平衡
        // 判断失衡的类型
        if (lHeight - rHeight > 0) {
            if (root.left && getHeight(root.left.right) > getHeight(root.left.left)) {
                root.left = rotateLeft(root.left)// 小左旋
            }
            root = rotateRight(root) // 大右旋
            return balanceBST(root)
        } else {
            if (root.right && getHeight(root.right.left) > getHeight(root.right.right)) {
                root.right = rotateRight(root.right) // 小右旋
            }
            // 大左旋
            root = rotateLeft(root)
            return balanceBST(root)

        }
    }
    return root
};

const test = new TreeNode(1)
test.right = new TreeNode(2)
test.right.right = new TreeNode(3)
test.right.right.right = new TreeNode(4)
console.log(JSON.stringify(test, null, 2));
console.log(JSON.stringify(balanceBST(test), null, 2));