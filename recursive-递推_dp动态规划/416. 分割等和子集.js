/**
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

 

示例 1：

输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11] 。
示例 2：

输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const sum = nums.reduce((a, b) => a + b);
    if (sum % 2 !== 0) {
        return false;
    }

    const len = nums.length
    const target = sum / 2

    const dp = new Array(len).fill(0).map(() => new Array(target + 1).fill(false)); // dp[i][j] 前i个数能不能凑成和为j
    for (let i = 0; i < len; i++) {
        dp[i][0] = true;
    }
    dp[0][nums[0]] = true


    for (let i = 1; i < len; i++) {
        for (let j = 1; j <= target; j++) {
            if (j >= nums[i]) {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
            } else {
                dp[i][j] = dp[i - 1][j]
            }
        }
    }
    return dp[len - 1][target];
};

console.log(
    // canPartition([1, 5, 11, 5]),
    // canPartition([1, 2, 3, 5]),
    canPartition([1, 5, 10, 6]),
    canPartition([1, 2, 5]),
);