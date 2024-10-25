/**
 * 给定一个整数数组 nums ，返回 nums[i] XOR nums[j] 的最大运算结果，其中 0 ≤ i ≤ j < n 。

 

示例 1：

输入：nums = [3,10,5,25,2,8]
输出：28
解释：最大运算结果是 5 XOR 25 = 28.
示例 2：

输入：nums = [0]
输出：0
示例 3：

输入：nums = [2,4]
输出：6
示例 4：

输入：nums = [8,10,2]
输出：10
示例 5：

输入：nums = [14,70,53,83,49,91,36,80,92,51,66,70]
输出：127

1 <= nums.length <= 2 * 105
0 <= nums[i] <= 231 - 1
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaximumXOR = function (nums) {
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            max = Math.max(max, nums[i] ^ nums[j])
        }
    }
    return max
};
// 上面的方法是暴力解法，时间复杂度为O(n^2)，不符合题目要求

class Trie {
    constructor() {
        this.root = {}
    }
    search(target) {
        let node = this.root
        for (let i = 31; i >= 0; i--) {
            let bit = (1 - (target >> i) & 1)// 从一个整数 num 中提取出第 i 位的二进制值,然后取反
            if (node[bit]) {
                node = node[bit]
            } else {
                node = node[1 - bit]
            }
        }
        return target ^ node.num // 找到的节点的值与目标节点的值进行异或运算
    }
    insert(num) {
        let node = this.root
        for (let i = 31; i >= 0; i--) {
            let bit = (num >> i) & 1 // 从一个整数 num 中提取出第 i 位的二进制值。
            node[bit] = node[bit] || {}
            node = node[bit]
        }
        node.num = num // 保存当前节点的值
        return node
    }
}
var findMaximumXOR = function (nums) {
    let max = 0;
    const trie = new Trie()
    for (let i = 0; i < nums.length; i++) {
        trie.insert(nums[i])
        max = Math.max(max, trie.search(nums[i]))
    }
    return max
}

console.log(findMaximumXOR([3, 10, 5, 25, 2, 8])) // 28
console.log(findMaximumXOR([0])) // 0
console.log(findMaximumXOR([2, 4])) // 6