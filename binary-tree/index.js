class TreeNode {
    constructor(val) {
        this.key = val
        this.left = null
        this.right = null
    }
}

function insertRandomNode(root, val) {
    if (root == null) return new TreeNode(val)
    // 随机插入left 或 right
    const random = Math.random()
    if (random > 0.5) {
        root.left = insertRandomNode(root.left, val)
    } else {
        root.right = insertRandomNode(root.right, val)
    }
    return root
}
/**
 * 生成一个n个节点 val [1, n]的二叉树
 */
function createRandomTree(n) {
    let root = null

    for (let i = 1; i <= n; i++) {
        root = insertRandomNode(root, i)
    }

    return root
}

/**
 * 前序遍历
 */
function preOrderTraverse(root) {
    if (root == null) return []
    const keys = [root.key]
    const leftKeys = preOrderTraverse(root.left)
    const rightKeys = preOrderTraverse(root.right)
    return keys.concat(leftKeys, rightKeys)
}
/**
 * 中序遍历
 */
function middleOrderTraverse(root) {
    if (root == null) return []
    const keys = [root.key]
    const leftKeys = middleOrderTraverse(root.left)
    const rightKeys = middleOrderTraverse(root.right)
    return leftKeys.concat(keys, rightKeys)
}
/**
 * 后续遍历
 */
function postOrderTraverse(root) {
    if (root == null) return []
    const keys = []
    const leftKeys = postOrderTraverse(root.left)
    const rightKeys = postOrderTraverse(root.right)
    return keys.concat(leftKeys, rightKeys, [root.key])
}
let tree = createRandomTree(5)
console.log(tree);
console.log(preOrderTraverse(tree));
console.log(middleOrderTraverse(tree));
console.log(postOrderTraverse(tree));