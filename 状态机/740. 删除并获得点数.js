/**
 * 给你一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除 所有 等于 nums[i] - 1 和 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

 

示例 1：

输入：nums = [3,4,2]
输出：6
解释：
删除 4 获得 4 个点数，因此 3 也被删除。
之后，删除 2 获得 2 个点数。总共获得 6 个点数。
示例 2：

输入：nums = [2,2,3,3,3,4]
输出：9
解释：
删除 3 获得 3 个点数，接着要删除两个 2 和 4 。
之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
总共获得 9 个点数。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
    const max = Math.max(...nums);
    // 统计每个数字的和为删除该数字可以获得的点数，
    // 因为删除某个数字除了删除 +1 和 -1 外，剩余的该数字都可以计算进点数里面
    const sum = new Array(max + 1).fill(0)
    for (num of nums) {
        sum[num] += num
    }
    // 1. 动态规划
    // const dp = [] // dp[i]代表删除i值能获得的最大点数
    // dp[0] = sum[0]
    // dp[1] = Math.max(sum[0], sum[1])

    // for (let i = 2; i < sum.length; i++) {
    //     dp[i] = Math.max(dp[i - 1], dp[i - 2] + sum[i])
    // }
    // return dp[sum.length - 1]

    // 2. 每一次状态转移只用到两个值的可以优化为滚动数组的方式
    let first = sum[0]
    let second = Math.max(sum[0], sum[1])

    for (let i = 2; i < sum.length; i++) {
        const temp = second
        second = Math.max(second, first + sum[i])
        first = temp
    }
    return second
};

console.log(deleteAndEarn([3, 4, 2]))
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4]))