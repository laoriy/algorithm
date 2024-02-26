/**
 * 
1438. 绝对差不超过限制的最长连续子数组

给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。

如果不存在满足条件的子数组，则返回 0 。

 

示例 1：

输入：nums = [8,2,4,7], limit = 4
输出：2 
解释：所有子数组如下：
[8] 最大绝对差 |8-8| = 0 <= 4.
[8,2] 最大绝对差 |8-2| = 6 > 4. 
[8,2,4] 最大绝对差 |8-2| = 6 > 4.
[8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
[2] 最大绝对差 |2-2| = 0 <= 4.
[2,4] 最大绝对差 |2-4| = 2 <= 4.
[2,4,7] 最大绝对差 |2-7| = 5 > 4.
[4] 最大绝对差 |4-4| = 0 <= 4.
[4,7] 最大绝对差 |4-7| = 3 <= 4.
[7] 最大绝对差 |7-7| = 0 <= 4. 
因此，满足题意的最长子数组的长度为 2 。
示例 2：

输入：nums = [10,1,2,4,7,2], limit = 5
输出：4 
解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。
示例 3：

输入：nums = [4,2,2,2,4,4,2,2], limit = 0
输出：3
 
 */


function longestSubarray(nums, limit) {
    let ret = 0
    let left = 0, right = 0;
    let minQueue = []
    let maxQueue = []
    while (right < nums.length) {
        while (minQueue.length && nums[minQueue[minQueue.length - 1]] > nums[right]) {
            minQueue.pop()
        }
        while (maxQueue.length && nums[maxQueue[maxQueue.length - 1]] < nums[right]) {
            maxQueue.pop()
        }
        minQueue.push(right);
        maxQueue.push(right);

        // 移动左边
        while (minQueue.length && maxQueue.length && nums[maxQueue[0]] - nums[minQueue[0]] > limit) {
            if (minQueue[0] === left) minQueue.shift()
            if (maxQueue[0] === left) maxQueue.shift()
            left++
        }

        ret = Math.max(ret, right - left + 1)

        right++
    }

    return ret;
};

console.log(
    longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0),
    longestSubarray([10, 1, 2, 4, 7, 2], 5),
)