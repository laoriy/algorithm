/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function generateTree(nums) {
    if (nums.length === 0) return null;
    let mid = Math.floor(nums.length / 2)
    let node = new TreeNode(nums[mid])
    node.left = generateTree(nums.slice(0, mid))
    node.right = generateTree(nums.slice(mid + 1))
    return node
}


/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    return generateTree(nums)
};