/**
 * 给你一个整数数组 nums 。nums 中，子数组的 范围 是子数组中最大元素和最小元素的差值。

返回 nums 中 所有 子数组范围的 和 。

子数组是数组中一个连续 非空 的元素序列。

 

示例 1：

输入：nums = [1,2,3]
输出：4
解释：nums 的 6 个子数组如下所示：
[1]，范围 = 最大 - 最小 = 1 - 1 = 0 
[2]，范围 = 2 - 2 = 0
[3]，范围 = 3 - 3 = 0
[1,2]，范围 = 2 - 1 = 1
[2,3]，范围 = 3 - 2 = 1
[1,2,3]，范围 = 3 - 1 = 2
所有范围的和是 0 + 0 + 0 + 1 + 1 + 2 = 4
示例 2：

输入：nums = [1,3,3]
输出：4
解释：nums 的 6 个子数组如下所示：
[1]，范围 = 最大 - 最小 = 1 - 1 = 0
[3]，范围 = 3 - 3 = 0
[3]，范围 = 3 - 3 = 0
[1,3]，范围 = 3 - 1 = 2
[3,3]，范围 = 3 - 3 = 0
[1,3,3]，范围 = 3 - 1 = 2
所有范围的和是 0 + 0 + 0 + 2 + 0 + 2 = 4
示例 3：

输入：nums = [4,-2,-3,4,1]
输出：59
解释：nums 中所有子数组范围的和是 59
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var subArrayRanges = function (nums) {
    let ans = 0
    let n = nums.length
    for (let i = 0; i < n; i++) {
        let max = nums[i]
        let min = nums[i]
        for (let j = i + 1; j < n; j++) {
            let n = nums[j]
            if (n > max) max = n
            if (n < min) min = n
            ans += (max - min)
        }
    }
    return ans
};
function getValue(qmin, qmax, nums) {
    let p = qmin[0], q = qmax[0];
    let pre_pos = -1
    let ans = 0
    while (p !== qmin[qmin.length - 1]) {
        let pos = Math.min(p, q)
        ans += ((pos - pre_pos) * Math.abs(nums[q] - nums[p]))
        if (p === pos) p++
        if (q === pos) q++
        pre_pos = pos
    }
    return ans
}
var subArrayRanges = function (nums) {
    const n = nums.length;
    let ans = 0;

    const qmin = []
    const qmax = []
    for (let i = 0; i < n; i++) {
        while (qmin.length && nums[i] <= nums[qmin[qmin.length - 1]]) qmin.pop()
        while (qmax.length && nums[i] >= nums[qmax[qmax.length - 1]]) qmax.pop()
        qmin.push(i)
        qmax.push(i)
        ans += getValue(qmin, qmax, nums)
    }
    return ans
};


console.log(subArrayRanges([1, 2, 3]))
console.log(subArrayRanges([1, 3, 3]))
console.log(subArrayRanges([4, -2, -3, 4, 1]))
