/**
 * 给你一个非负整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

 输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
示例 2：

输入：nums = [1], target = 1
输出：1
 */

/** 普通深搜实现
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
    // 前i个值用上拼凑target

    function dfs(i, remainTarget) {
        if (i === nums.length) {
            return remainTarget === 0 ? 1 : 0
        }

        return dfs(i + 1, remainTarget - nums[i]) + dfs(i + 1, remainTarget + nums[i])

    }

    return dfs(0, target)
};

/** 动态规划
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {

    const sum = nums.reduce((a, b) => a + b)

    if (sum < target || (sum - target) % 2 !== 0) {
        return 0
    }

    const bagSize = (sum - target) / 2
    const dp = new Array(bagSize + 1).fill(0)
    dp[0] = 1

    for (let i = 0; i < nums.length; i++) {
        for (let j = bagSize; j >= nums[i]; j--) {
            dp[j] += dp[j - nums[i]]
        }
    }
    return dp[bagSize]
};

console.log(
    findTargetSumWays([1, 1, 1, 1, 1], 3),
    findTargetSumWays([1], -1),
)