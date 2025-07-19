/**
 * 给你一个整数数组 nums 和一个整数 k 。请你向 nums 中追加 k 个 未 出现在 nums 中的、互不相同 的 正 整数，并使结果数组的元素和 最小 。

返回追加到 nums 中的 k 个整数之和。

 

示例 1：

输入：nums = [1,4,25,10,25], k = 2
输出：5
解释：在该解法中，向数组中追加的两个互不相同且未出现的正整数是 2 和 3 。
nums 最终元素和为 1 + 4 + 25 + 10 + 25 + 2 + 3 = 70 ，这是所有情况中的最小值。
所以追加到数组中的两个整数之和是 2 + 3 = 5 ，所以返回 5 。
示例 2：

输入：nums = [5,6], k = 6
输出：25
解释：在该解法中，向数组中追加的两个互不相同且未出现的正整数是 1 、2 、3 、4 、7 和 8 。
nums 最终元素和为 5 + 6 + 1 + 2 + 3 + 4 + 7 + 8 = 36 ，这是所有情况中的最小值。
所以追加到数组中的两个整数之和是 1 + 2 + 3 + 4 + 7 + 8 = 25 ，所以返回 25 。
 


1 <= nums.length <= 10^5
1 <= nums[i], k <= 10^9
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimalKSum = function (nums, k) {
    const arr = Array.from(new Set(nums.sort((a, b) => a - b)))
    let sum = k * (k + 1) / 2

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] <= k) {
            sum += ((k + 1) - arr[i])
            k += 1
        } else {
            break
        }
    }
    return sum
};

console.log(minimalKSum([1, 4, 25, 10, 25], 2))
console.log(minimalKSum([5, 6], 6))
console.log(minimalKSum([1], 100000000))