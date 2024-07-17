/**
 * 给定一个二叉搜索树 root 和一个目标结果 k，如果二叉搜索树中存在两个元素且它们的和等于给定的目标结果，则返回 true。
 * 
 * 
 * root = [5,3,6,2,4,null,7], k = 9
 */

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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    const set = new Set();
    function dfs(root) {
        if (!root) return false
        if (set.has(k - root.val)) return true
        set.add(root.val)
        return dfs(root.left) || dfs(root.right)
    }
    dfs(root)
};
/**
 * 中序遍历后转换为 有序序列中的两个和为指定值的两个数，时间复杂度 O(n)，空间复杂度 O(n)
 */
var findTarget2 = function (root, k) {
    const arr = []
    function inorder(root){
        if(!root) return
        inorder(root.left)
        arr.push(root.val)
        inorder(root.right)
    }
    inorder(root)
    let p = 0, q = arr.length - 1
    while(p < q){
        const sum = arr[p] + arr[q]
        if(sum === k) return true
        else if(sum < k) p++
        else q--
    }
    return false
};