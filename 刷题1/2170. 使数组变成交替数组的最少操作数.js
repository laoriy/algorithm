/**
 * 给你一个下标从 0 开始的数组 nums ，该数组由 n 个正整数组成。

如果满足下述条件，则数组 nums 是一个 交替数组 ：

nums[i - 2] == nums[i] ，其中 2 <= i <= n - 1 。
nums[i - 1] != nums[i] ，其中 1 <= i <= n - 1 。
在一步 操作 中，你可以选择下标 i 并将 nums[i] 更改 为 任一 正整数。

返回使数组变成交替数组的 最少操作数 。

示例 1：

输入：nums = [3,1,3,2,4,3] // left: [3,3,4],right:[1,2,3]
输出：3
解释：
使数组变成交替数组的方法之一是将该数组转换为 [3,1,3,1,3,1] 。
在这种情况下，操作数为 3 。
可以证明，操作数少于 3 的情况下，无法使数组变成交替数组。
示例 2：

输入：nums = [1,2,2,2,2] // left:[1,2,2],right:[2,2]
输出：2
解释：
使数组变成交替数组的方法之一是将该数组转换为 [1,2,1,2,1].
在这种情况下，操作数为 2 。
注意，数组不能转换成 [2,2,2,2,2] 。因为在这种情况下，nums[0] == nums[1]，不满足交替数组的条件。
 */

// enter: 2,2,3,2,1,2,2 left:[2,3,1,2],right:[2,2,2]

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
    let oddMax = [] // 奇数最多的两个数字对应的值
    let evenMax = [] // 偶数最多的两个数字对应的值
    const oddMap = new Map() // 奇数位
    const evenMap = new Map() // 偶数位
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if (i % 2 === 0) {
            const v = (evenMap.get(num) || 0) + 1
            evenMap.set(num, v)
            evenMax = Array.from(new Set([...evenMax, num]))
            evenMax.sort((a, b) => evenMap.get(b) - evenMap.get(a))
            evenMax = evenMax.slice(0, 2)
        } else {
            const v = (oddMap.get(num) || 0) + 1
            oddMap.set(num, v)
            oddMax = Array.from(new Set([...oddMax, num]))
            oddMax.sort((a, b) => oddMap.get(b) - oddMap.get(a))
            oddMax = oddMax.slice(0, 2)
        }
    }

    const maxEvenCount = [evenMap.get(evenMax[0]) || 0, evenMap.get(evenMax[1]) || 0]
    const maxOddCount = [oddMap.get(oddMax[0]) || 0, oddMap.get(oddMax[1]) || 0]
    // console.log(evenMap, maxEvenCount)
    // console.log(oddMap, maxOddCount)
    const result = oddMax[0] === evenMax[0] ? Math.min(nums.length - maxEvenCount[0] - maxOddCount[1], nums.length - maxEvenCount[1] - maxOddCount[0]) : nums.length - maxEvenCount[0] - maxOddCount[0]
    return result
};
// console.log(minimumOperations([3, 1, 3, 2, 4, 3]))
// console.log(minimumOperations([1, 2, 2, 2, 2]))
// console.log(minimumOperations([2, 2, 3, 2, 1, 2, 2]))
// console.log(minimumOperations([1]))
console.log(minimumOperations([4, 12, 91, 17, 29, 2, 32, 49, 5, 30, 89, 21, 91, 34, 71, 22, 88, 32, 36, 64, 28, 69, 7, 100, 35, 41, 62, 91, 85, 61, 4, 79, 77, 52, 57, 97, 41, 91, 13, 34, 37, 84, 10, 10, 37, 93, 58, 35, 81, 36, 81, 6, 50, 27, 68]))
