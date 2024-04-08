/**
 * 456. 132 模式

给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。

如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

 
示例 1：

输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
示例 2：

输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
示例 3：

输入：nums = [-1,3,3,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。
 */

/**
 * Finds the existence of a 132 pattern.
 *
 * @param {number[]} nums - The array of numbers to search
 * @return {boolean} Returns true if the pattern exists, false otherwise
 */
function find132pattern(nums) {
    let l = [Number.MAX_SAFE_INTEGER] // 每个位置前面的最小值
    for (let i = 1; i < nums.length; i++) {
        l[i] = Math.min(l[i - 1], nums[i - 1])
    }


    let stack = []

    for (let i = nums.length - 1; i >= 0; i--) {
        let val = nums[i]
        while (stack.length && stack[stack.length - 1] < nums[i]) {
            val = stack.pop()
        }
        stack.push(nums[i])
        if (l[i] < nums[i] && l[i] < val && val < nums[i]) {
            return true
        }
    }

    return false


};

console.log(
    find132pattern([3, 1, 4, 2]),
    find132pattern([1, 2, 3, 4]),
    find132pattern([-1, 3, 3, 0]),
    find132pattern([1, 0, 1, -4, -3]),
    find132pattern([3, 5, 0, 3, 4])
)