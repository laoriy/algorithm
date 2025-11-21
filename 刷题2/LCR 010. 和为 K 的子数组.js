/**
 * 给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。

 

示例 1：

输入:nums = [1,1,1], k = 2 
输出: 2
解释: 此题 [1,1] 与 [1,1] 为两种不同的情况
示例 2：

输入:nums = [1,2,3], k = 3
输出: 2
 

提示:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
 */


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    const sums = [0]
    let result = 0
    for (let num of nums) sums.push(num + (sums[sums.length - 1]))
    const sumMap = new Map()
    for (sum of sums) {
        const neeSumCount = sumMap.get(sum - k) || 0 // 前面有没有对应的 sum - k 的前缀和，有的话 sum-(sum-k) = k
        // console.log(neeSumCount,sum - k)
        result += neeSumCount
        sumMap.set(sum, (sumMap.get(sum) || 0) + 1)
    }

    return result

};

console.log(subarraySum([1, 1, 1], 2))