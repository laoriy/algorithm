/**
 * 给定一个二进制数组 nums 和一个整数 k，假设最多可以翻转 k 个 0 ，则返回执行操作后 数组中连续 1 的最大个数 。

 

示例 1：

输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释：[1,1,1,0,0,1,1,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 6。
示例 2：

输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
输出：10
解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
粗体数字从 0 翻转到 1，最长的子数组长度为 10。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
    // 窗口内部0的个数不能超过k个。
    let l = 0;
    let r = 0;
    let countZero = 0;
    let ans = 0

    while (true) {
        if (countZero <= k) {
            if (nums[r] === 0) countZero++;
            r++;
        } else {
            if (nums[l] === 0) countZero--;
            l++;
        }
        ans = Math.max(ans, r - l - 1);
        if (r > nums.length) break;
    }
    return ans;
};

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)) // 6
console.log(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)) // 10
console.log(longestOnes([0, 0, 0, 1], 4)) // 4