/**
 * 862. 和至少为 K 的最短子数组

给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，并返回该子数组的长度。如果不存在这样的 子数组 ，返回 -1 。

子数组 是数组中 连续 的一部分。

 

示例 1：

输入：nums = [1], k = 1  --- 前缀和数组为[1]
输出：1
示例 2：

输入：nums = [1,2], k = 4  --- 前缀和数组为[1,3]
输出：-1
示例 3：

输入：nums = [2,-1,2], k = 3 --- 前缀和数组为[2,1,3]
输出：3
 */

function shortestSubarray(nums, k) {
    if (nums.length === 0) return -1
    // 转换为前缀和，问题就变成了 滑动窗口中当前值  和  位于当前值之前的值之间的差值为k的最短子数组
    const preSums = [0]
    let n = nums.length;

    let total = 0
    nums.forEach(element => {
        total += element
        preSums.push(total)
    });

    const minQueue = []

    let right = 0
    let res = n + 1

    while (right <= n) {
        // 维护单调性
        while (minQueue.length && preSums[minQueue[minQueue.length - 1]] > preSums[right]) {
            minQueue.pop()
        }

        minQueue.push(right)
        while (minQueue.length && preSums[right] - preSums[minQueue[0]] >= k) {
            res = Math.min(res, right - minQueue.shift())
        }
        right++
    }

    return res < n + 1 ? res : -1;



};

console.log(
    shortestSubarray([1], 1),
    shortestSubarray([1, 2], 4),
    shortestSubarray([2, -1, 2], 3),
    shortestSubarray([-1, -1, -1], 3),

)