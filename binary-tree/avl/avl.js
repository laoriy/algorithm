
class Node {
    key = 0;
    left = null
    right = null
    height = 0;
    constructor(key, height) {
        this.key = key
        this.left = null
        this.right = null
        this.height = height
    }
}
class AvlTree {
    root = null
    constructor() {
        this.root = null;
    }

    #rotateLeft(root) {
        let newRoot = root.right // 新根节点
        root.right = newRoot.left
        newRoot.left = root
        this.#updateHeight(root)
        this.#updateHeight(newRoot)
        return newRoot
    }
    #rotateRight(root) {
        let newRoot = root.left;
        root.left = newRoot.right
        newRoot.right = root

        this.#updateHeight(root)
        this.#updateHeight(newRoot)
        return newRoot
    }
    #maintain(node) {
        if (!node) return node
        const l = node.left
        const r = node.right
        const hDiff = (l?.height ?? 0) - (r?.height ?? 0)
        if (Math.abs(hDiff) < 2) return node
        // 左边的树高
        if (hDiff > 0) {
            const ll = l?.left
            const lr = l?.right
            if (l && (ll?.height ?? 0) < (lr?.height ?? 0)) {
                // LR类型
                node.left = this.#rotateLeft(node.left) // 小左旋
            }
            // LL型
            node = this.#rotateRight(node) // 大右旋
        } else {
            // 右边的树高
            const rl = r?.left
            const rr = r?.right

            if (r && (rl?.height ?? 0) > (rr?.height ?? 0)) {
                // RL类型

                node.right = this.#rotateRight(node.right) // 小右旋
            }
            node = this.#rotateLeft(node) // 大左旋
        }
        return node
    }
    #findMinNode(node) {
        while (node !== null && node.left !== null) {
            node = this.#findMinNode(node.left);
        }
        return node;
    }
    #updateHeight(node) {
        if (!node) return
        if (!node.left && !node.right) {
            node.height = 1
            return
        } else if (!node.left) {
            node.height = node.right.height + 1
        } else if (!node.right) {
            node.height = node.left.height + 1
        } else {
            node.height = Math.max(node.left.height, node.right.height) + 1
        }

    }
    #delete(key, root) {
        if (!root) return null
        if (key < root.key) {
            root.left = this.#delete(key, root.left)
        } else if (key > root.key) {
            root.right = this.#delete(key, root.right)
        } else {
            // 找到了要删除的节点
            if (!root.left && !root.right) {
                return null
            } else if (!root.left) {
                return root.right
            } else if (!root.right) {
                return root.left
            } else {
                // 找到右子树的最小节点(后继节点) 覆盖当前节点。 然后删除后继节点
                let tempNode = this.#findMinNode(root.right)
                root.key = tempNode.key
                root.right = this.#delete(tempNode.key, root.right)
            }
        }
        this.#updateHeight(root)
        return this.#maintain(root);
    }
    #insert(key, node) {
        if (!node) return new Node(key, 1)
        if (key < node.key) {
            node.left = this.#insert(key, node.left);
        } else if (key > node.key) {
            node.right = this.#insert(key, node.right);
        }
        this.#updateHeight(node)
        return this.#maintain(node);
    }

    getNewNode(key) {
        return new Node(key, 1);
    }

    delete(key) {
        this.root = this.#delete(key, this.root);
    }
    insert(key) {
        this.root = this.#insert(key, this.root);
    }

}

let bst = new AvlTree();
bst.insert(5);
bst.insert(9);
bst.insert(8);
bst.insert(3);
bst.insert(2);
bst.insert(4);
bst.insert(1);
bst.insert(7);
bst.delete(1);
bst.delete(7);
bst.delete(5);
bst.delete(8);


console.log(JSON.stringify(bst, null, 2));