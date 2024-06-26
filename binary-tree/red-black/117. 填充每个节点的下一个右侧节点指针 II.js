/* 给定一个二叉树：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。

初始状态下，所有 next 指针都被设置为 NULL 。 */

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
    if (!root) return null
    const queue = [root]
    while (queue.length) {
        let len = queue.length
        for (let i = 0; i < len; i++) {
            const node = queue.shift()
            node.next = i < len - 1 ? queue[0] : null
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
    }
    return root
};

// 上面的解法的时间复杂度是 O(n)，空间复杂度是 O(n)。

// 下面的解法的时间复杂度是 O(n)，空间复杂度是 O(1)。
var connect = function (root) {
    if (!root) return null
    let start = root
    let nextStart = null
    let last = null

    function handle(p) {
        if (last) last.next = p
        if (nextStart === null) nextStart = p
        last = p
    }

    while (start) {
        last = null;
        nextStart = null;
        for (let p = start; p !== null; p = p.next) {
            if (p.left) {
                handle(p.left)
            }
            if (p.right) {
                handle(p.right)
            }
        }
        start = nextStart
    }
    return root
}
