/**
 * 

2762. 不间断子数组
 给你一个下标从 0 开始的整数数组 nums 。nums 的一个子数组如果满足以下条件，那么它是 不间断 的：

i，i + 1 ，...，j  表示子数组中的下标。对于所有满足 right <= i1, i2 <= j 的下标对，都有 0 <= |nums[i1] - nums[i2]| <= 2 。
请你返回 不间断 子数组的总数目。

子数组是一个数组中一段连续 非空 的元素序列。

 

示例 1：

输入：nums = [5,4,2,4]
输出：8
解释：
大小为 1 的不间断子数组：[5], [4], [2], [4] 。
大小为 2 的不间断子数组：[5,4], [4,2], [2,4] 。
大小为 3 的不间断子数组：[4,2,4] 。
没有大小为 4 的不间断子数组。
不间断子数组的总数目为 4 + 3 + 1 = 8 。
除了这些以外，没有别的不间断子数组。
示例 2：

输入：nums = [1,2,3]
输出：6
解释：
大小为 1 的不间断子数组：[1], [2], [3] 。
大小为 2 的不间断子数组：[1,2], [2,3] 。
大小为 3 的不间断子数组：[1,2,3] 。
不间断子数组的总数目为 3 + 2 + 1 = 6 。
 */


function continuousSubarrays(nums) {
    let sum = 0
    let left = 0
    let minQueue = [];
    let maxQueue = [];

    for (let right = 0; right < nums.length; right++) {
        while (minQueue.length && nums[minQueue[minQueue.length - 1]] > nums[right]) {
            minQueue.pop()
        }
        while (maxQueue.length && nums[maxQueue[maxQueue.length - 1]] < nums[right]) {
            maxQueue.pop()
        }


        minQueue.push(right);
        maxQueue.push(right);
        // 如果最大值和最小值的差超过2，那么左边界需要向右移动，直到最大值和最小值的差小于2，这时候左右边界对应的差值都是满足条件的
        // 移动过程中，如果单调队列的值和左边界相同，那么需要将其出队，因为这个已经不用维护在单调队列中了。
        // 然后再移动右边界
        while (maxQueue.length && minQueue.length && nums[maxQueue[0]] - nums[minQueue[0]] > 2) {
            if (minQueue[0] === left) minQueue.shift()
            if (maxQueue[0] === left) maxQueue.shift()
            left++
        }
        sum += right - left + 1

    }

    return sum
}


console.log(
    continuousSubarrays([5, 4, 2, 4]),
    continuousSubarrays([65, 66, 67, 66, 66, 65, 64, 65, 65, 64]),
    // continuousSubarrays([1, 2, 3]),
)