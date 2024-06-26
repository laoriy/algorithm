/**
 * 给你一个整数数组 nums 和两个整数 indexDiff 和 valueDiff 。

找出满足下述条件的下标对 (i, j)：

i != j,
abs(i - j) <= indexDiff
abs(nums[i] - nums[j]) <= valueDiff
如果存在，返回 true ；否则，返回 false 

示例 1：

输入：nums = [1,2,3,1], indexDiff = 3, valueDiff = 0
输出：true
解释：可以找出 (i, j) = (0, 3) 。
满足下述 3 个条件：
i != j --> 0 != 3
abs(i - j) <= indexDiff --> abs(0 - 3) <= 3
abs(nums[i] - nums[j]) <= valueDiff --> abs(1 - 1) <= 0
示例 2：

输入：nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3
输出：false
解释：尝试所有可能的下标对 (i, j) ，均无法满足这 3 个条件，因此返回 false 。
 */
// !数据多了会超时
/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function (nums, indexDiff, valueDiff) {
    const windows = [] // 滑动窗口
    function getIsManzu(cur) {
        //  寻找 范围内能不能找到(nums[i] - valueDiff, num[i] + valueDiff)的值 
        const v = nums[cur]
        const ans = windows.indexOf((item) => ((item.v >= v - valueDiff) && (item.v <= v + valueDiff)) && (cur !== item.i))
        if (ans) return true
        return false

    }

    for (let i = 0; i < nums.length; i++) {
        windows.push({ v: nums[i], i })
        if (windows.length > indexDiff + 1) windows.shift()
        if (getIsManzu(i)) return true
    }
    return false
};

console.log(
    containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3),
    containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0),
    containsNearbyAlmostDuplicate([1, 2, 2, 3, 1], 3, 0)
)