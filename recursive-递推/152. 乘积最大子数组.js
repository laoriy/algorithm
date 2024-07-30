/**
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续
子数组
（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32-位 整数。

 

示例 1:

输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
示例 2:

输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {

    let max = nums[0]
    let min = nums[0]

    let ans = nums[0]

    for (let i = 1; i < nums.length; i++) {
        const val = nums[i]
        if (val < 0) {
            const temp = max
            max = min
            min = temp
        }
        min = Math.min(val, min * val)
        max = Math.max(val, max * val)
        ans = Math.max(ans, max)
    }
    return ans
};

console.log(maxProduct([2, 3, -2, 4]), maxProduct([-2, 3, -4]))