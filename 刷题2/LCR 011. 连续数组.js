/**
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

 

示例 1：

输入: nums = [0,1] 0, 1
输出: 2
解释: [0, 1] 是具有相同数量 0 和 1 的最长连续子数组。
示例 2：

输入: nums = [0,1,0] 0,0,1,1
输出: 2
解释: [0, 1] (或 [1, 0]) 是具有相同数量 0 和 1 的最长连续子数组。
 

提示：

1 <= nums.length <= 105
nums[i] 不是 0 就是 1
 
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
    const sums = []
    const map = new Map()
    let ans = 0
    map.set(0, 0)
    sums[0] = 0
    for (let i = 0; i < nums.length; i++) {
        let sum = sums[i] + (nums[i] || -1) // 0当做-1处理
        if (map.has(sum)) {
            ans = Math.max(i + 1 - map.get(sum), ans)
        } else {
            map.set(sum, i + 1)
        }
        sums.push(sum)
    }
    // console.log(sums)

    return ans
};
console.log(findMaxLength([0, 1]))
console.log(findMaxLength([0, 1, 0]))
console.log(findMaxLength([0, 1, 0, 0, 0, 1, 1]))
