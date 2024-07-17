// 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
    const nums = []
    function inorder(root) {
        if (!root) return
        inorder(root.left)
        nums.push(root.val)
        inorder(root.right)
    }

    function findTwoSwapped(nums) {
        let index1 = -1
        let index2 = -1
        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                index2 = i + 1
                if (index1 === -1) index1 = i
                else break
            }
        }
        return [nums[index1], nums[index2]]
    }
    let count = 2

    const recover = (r, x, y) => {
        if (r === null) return
        if (r.val === x || r.val === y) {
            r.val = r.val === x ? y : x;
            if (--count === 0) {
                return;
            }
        }
        recover(r.left, x, y);
        recover(r.right, x, y);
    }

    inorder(root);
    const [first, second] = findTwoSwapped(nums);
    recover(root, first, second);
};


function recoverTree2(root) {
    let pre = null
    let first = null, second = null
    function inorder(root) {
        if (!root) return
        inorder(root.left)
        if(pre && root.val < pre.val ){
            if(first === null) first = pre
            second = root
        }
        pre = root
        inorder(root.right)
    }
    inorder(root)
    const a = [second.val, first.val]
    first.val = a[0]
    second.val = a[1]
}