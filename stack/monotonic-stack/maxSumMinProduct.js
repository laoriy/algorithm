/**
 * 1856. 子数组最小乘积的最大值

一个数组的 最小乘积 定义为这个数组中 最小值 乘以 数组的 和 。

比方说，数组 [3,2,5] （最小值是 2）的最小乘积为 2 * (3+2+5) = 2 * 10 = 20 。
给你一个正整数数组 nums ，请你返回 nums 任意 非空子数组 的最小乘积 的 最大值 。由于答案可能很大，请你返回答案对  109 + 7 取余 的结果。

请注意，最小乘积的最大值考虑的是取余操作 之前 的结果。题目保证最小乘积的最大值在 不取余 的情况下可以用 64 位有符号整数 保存。

子数组 定义为一个数组的 连续 部分。

 

示例 1：

输入：nums = [1,2,3,2]
输出：14
解释：最小乘积的最大值由子数组 [2,3,2] （最小值是 2）得到。
2 * (2+3+2) = 2 * 7 = 14 。
示例 2：

输入：nums = [2,3,3,1,2]
输出：18
解释：最小乘积的最大值由子数组 [3,3] （最小值是 3）得到。
3 * (3+3) = 3 * 6 = 18 。
示例 3：

输入：nums = [3,1,5,6,4,2]
输出：60
解释：最小乘积的最大值由子数组 [5,6,4] （最小值是 4）得到。
4 * (5+6+4) = 4 * 15 = 60 。
 */
/**
 * Calculate the maximum sum of the minimum products.
 *
 * @param {number[]} nums - An array of numbers
 * @return {number} The maximum sum of the minimum products
 */
function maxSumMinProduct(nums) {
    // 遍历每一个值 找出这个值的左边界和右边界，左边界为前面不比自己小的个数，右边界为后面不比自己小的个数，这样边界越大的计算乘积肯定越大
    const l = new Array(nums.length).fill(-1)
    const r = new Array(nums.length).fill(nums.length)
    const prefixSum = new Array(nums.length+1).fill(0)
    for(let i=0;i<nums.length;i++){
        prefixSum[i+1]=prefixSum[i]+nums[i] 
    }
    let max = BigInt(0)
    const stack = [] // 单调递增栈
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
            let top = stack.pop()
            r[top] = i
        }
        if (stack.length) l[i] = stack[stack.length - 1]

        stack.push(i)
    }
    for (let i = 0; i < nums.length; i++) {
        const area = BigInt((prefixSum[r[i]] - prefixSum[l[i] + 1])) * BigInt(nums[i])
        if (max < area) max = area  // 从左边界到右边界中间的最小乘积
    }
    return max % BigInt(1000000007)

};

console.log(
    maxSumMinProduct([1, 2, 3, 2]),
    maxSumMinProduct([2, 3, 3, 1, 2]),
    maxSumMinProduct([3, 1, 5, 6, 4, 2]),
);