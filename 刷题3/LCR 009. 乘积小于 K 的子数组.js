/**
 * 给定一个正整数数组 nums和整数 k ，请找出该数组内乘积小于 k 的连续的子数组的个数。

 

示例 1：

输入: nums = [10,5,2,6], k = 100
输出: 8
解释: 8 个乘积小于 100 的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
需要注意的是 [10,5,2] 并不是乘积小于100的子数组。
示例 2：

输入: nums = [1,2,3], k = 0
输出: 0
 

提示：

1 <= nums.length <= 3 * 104
1 <= nums[i] <= 1000
0 <= k <= 106
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    let left = 0
    let product = 1
    let ans = 0
    for (let right = 0; right < nums.length; right++) {
        const num = nums[right]
        product *= num
        while (left <= right) {
            if (product < k) {
                ans += (right - left + 1) // 加的是以右指针为结尾的数量
                break;
            } else {
                product /= nums[left]
                left++
            }
        }
    }
    return ans
}
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100))
console.log(numSubarrayProductLessThanK([1, 2, 3], 0))
console.log(numSubarrayProductLessThanK([10, 9, 10, 4, 3, 8, 3, 3, 6, 2, 10, 10, 9, 3], 19)) // 18