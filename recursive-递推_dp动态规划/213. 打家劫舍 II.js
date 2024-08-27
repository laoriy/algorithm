/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

 

示例 1：

输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
示例 2：

输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 3：

输入：nums = [1,2,3]
输出：3
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    const len = nums.length;
    const dp = new Array(len).fill(0).map(() => new Array(len).fill(0)) // dp[i][0] （dp[i][2]） 和 dp[i][1] (dp[i][3]) 分别代表 nums[i] 时不偷和偷的最大值
    if (len === 1) return nums[0];
    dp[0][0] = 0
    dp[0][1] = nums[0]
    // 强制将第一个房子不偷
    dp[0][2] = 0
    dp[0][3] = 0

    for (let i = 1; i < len; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1]) // 不偷
        dp[i][1] = Math.max(dp[i - 1][0] + nums[i], dp[i - 1][1]) // 偷
        dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][3]) // 不偷
        dp[i][3] = Math.max(dp[i - 1][2] + nums[i], dp[i - 1][3]) // 偷
    }
    return Math.max(dp[len - 1][0], dp[len - 1][2], dp[len - 1][3]) // 不偷最后一个的最大值   和  不偷第一个的最大值
};

console.log(
    rob([2, 3, 2]),
    rob([1, 2, 3, 1]),
    rob([1, 2, 3])
);

