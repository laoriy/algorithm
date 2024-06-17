const RED = 'RED'
const BLACK = 'BLACK'
class RBNode {
    /**
     * 创建一个新的节点
     * @param {number} key 要插入的数值
     * @param {string} color 颜色
     * @param {RBNode} left 左子树
     * @param {RBNode} right 右子树
     * @returns 一个新的节点
     */
    constructor(key, color = RED, left = null, right = null) {
        if (color !== RED && color !== BLACK)
            throw new Error('color can only be RED or BLACK')
        this.key = key
        this.left = left
        this.right = right
        this.color = color
    }

}
// ANSI颜色代码
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",

};

class RBTree {
    constructor() {
        this.root = null
    }
    // 层序遍历

    /**
 * 中序遍历红黑树，打印结果，查看插入操作是否正确
 * @param {RBNode} root
 * @param {number} deep
 * @returns
 */
    inorder(root, deep = 1) {
        if (!root) return
        let tab = ''
        for (let i = 1; i < deep; i++) {
            tab += '\t'
        }
        root.left && this.inorder(root.left, deep + 1)
        console.log(tab + (root.color[0] === 'R' ? `${colors.red}${root.key}${colors.reset}` : root.key))
        root.right && this.inorder(root.right, deep + 1)
    }
    /**
 * 围绕 node 进行左旋
 * 效果如下
 *         node           ->          pr(r)
 *        /   \           ->         /   \
 *       pl   pr(r)       ->       node   cr
 *           / \          ->       /  \
 *          cl  cr        ->      pl   cl
 * @param {Node} node 需要旋转的节点
 */
    #leftRotate(node) {
        const temp = node.right
        node.right = temp.left
        temp.left = node
        return temp
    }
    /**
     * 围绕 node 进行右旋
     * 效果如下
     *           node         ->          pl(l)
     *          /   \         ->        /   \
     *         pl(l) pr       ->       cl   node
     *        /  \            ->           / \
     *       cl   cr          ->          cr  pr
     * @param {Node} node 需要旋转的节点
     */
    #rightRotate(node) {
        const temp = node.left
        node.left = temp.right
        temp.right = node
        return node
    }

    insert(root, key) {
        root = this.#insertNode(root, key)
        root.color = BLACK
        return root
    }
    #insertNode(root, key) {
        if (root === null) {
            return new RBNode(key)
        }
        if (key === root.key) return root
        if (key < root.key) {
            root.left = this.#insertNode(root.left, key)
        } else {
            root.right = this.#insertNode(root.right, key)
        }
        return this.#insertMaintain(root)
    }
    #hasRedChild(node) {
        return node.left?.color === RED || node.right?.color === RED
    }
    #insertMaintain(root) {
        // 判断是否发生了冲突，root是祖父节点来看的
        let conflictFlag = 0
        if (root.left?.color === RED && this.#hasRedChild(root.left)) {
            conflictFlag = 1 // 左子树发生冲突
        }
        if (root.right?.color === RED && this.#hasRedChild(root.right)) {
            conflictFlag = 2 // 右子树发生冲突
        }
        if (conflictFlag === 0) return root // 都没有发生冲突

        // 下面肯定发生了冲突
        // 插入情况1：叔叔节点为红色
        if (root.left?.color === RED && root.right.color === RED) {
            root.color = RED
            root.left.color = root.right.color = BLACK
            return root
        }
        // 插入情况2：叔叔节点为黑色
        if (conflictFlag === 1) {
            if (root.left.right.color === RED) { // lr型，需要小左旋
                root.left = this.#leftRotate(root.left)
            }
            root = this.#rightRotate(root)
        } else if (conflictFlag === 2) {
            if (root.right.left?.color === RED) {
                root.right = this.#rightRotate(root.right)
            }
            root = this.#leftRotate(root)
        }
        // 统一采用红色上浮
        root.color = RED
        root.left.color = root.right.color = BLACK
        return root
    }
}

const tree = new RBTree()
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.forEach(v => {
    console.log(`------插入数据${v}------`)
    tree.root = tree.insert(tree.root, v)
    tree.inorder(tree.root)
    console.log('--------------------')
})
// console.log(JSON.stringify(tree, null, 2));
