// 基本的二叉搜索树
// https://juejin.cn/post/6844903504293675016

class Node {
    key = 0;
    left = null
    right = null
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BST {
    root = null
    constructor() {
        this.root = null
    }
    insert(key) {
        let newNode = new Node(key)
        if (!this.root) {
            this.root = newNode

        } else {
            this.insertNode(this.root, newNode)
        }
    }
    insertNode(node, newNode) {
        // 如果新节点值小于当前节点值，则插入左子节点
        if (newNode.key < node.key) {
            if (!node.left) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (!node.right) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    max() {
        return this.rangeNode(this.root, 'right') || null
    }
    min() {
        return this.rangeNode(this.root, 'left') || null
    }
    rangeNode(node, type) {
        while (node !== null && node.right !== null) {
            node = node[type]
        }
        return node.key
    }
    findMinNode(node) {
        while (node !== null && node.left !== null) {
            node = this.findMinNode(node.left);
        }
        return node;
    }

    remove(key) {
        this.roots = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        //1.要删除节点小于当前节点，往树的左侧查找
        if (node.key > key) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        //2.要删除节点大于当前节点，往树的右侧查找
        if (node.key < key) {
            node.right = removeNode(node.right, key);
            return node;
        }
        if (node.key === key) {
            //1.当前节点即无左侧节点又无右侧节点，直接删除，返回 null
            if (node.left === null && node.right === null) {
                return null;
            }
            //2.若右侧节点为 null，就证明它有左侧节点，将当前节点的引用改为左侧节点的引用，返回更新之后的值
            if (node.left !== null && node.right === null) {
                return node.left;
            }
            //3.若左侧节点为 null，就证明它有右侧节点，将当前节点的引用改为右侧节点的引用，返回更新之后的值
            if (node.left === null && node.right !== null) {
                return node.right;
            }
            // 4. 找到当前节点的后继节点，将当前节点的值改为后继节点的值，删除后继节点
            // 也可以找前驱节点
            var tempNode = this.findMinNode(node.right);
            node.key = tempNode.key;
            node.right = this.removeNode(node.right, tempNode.key);
            return node;
        }
    }

}


let bst = new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);
bst.inOrderTraverse(key => console.log(key))
console.log('-->');
console.log(bst.max());
console.log(bst.min());
console.log(bst.remove(23));

console.log('-->');
bst.inOrderTraverse(key => console.log(key))


let bst2 = new BST();
bst2.insert(1);
bst2.insert(2);
bst2.insert(3);
bst2.insert(4);
bst2.insert(5);

console.info(JSON.stringify(bst2));




