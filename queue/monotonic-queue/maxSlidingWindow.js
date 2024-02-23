/**
 * 
239. 滑动窗口最大值

给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

返回 滑动窗口中的最大值 。
示例 1：

输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1]  3  -1 -3  5  3  6  7       3
[1  3]  -1 -3  5  3  6  7       3

[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
示例 2：

输入：nums = [1], k = 1
输出：[1]
*
*/

function maxSlidingWindow(nums, k) {
    let ans = []
    const queue = []
    for (let i = 0; i < nums.length; i++) {
        // 1. 先保证队列的单调性 大-->小
        while (queue.length && nums[queue[queue.length - 1]] < nums[i]) {
            queue.pop()
        }
        queue.push(i) // 添加进队列

        // 2. 队列首位的index 已经不在 窗口范围内了，所以这个值也失去窗口范围内最大值的意义了，将它出队
        if (queue[0] === i - k) queue.shift()
        // 这时候在将窗口中的最大值保存起来，其实就是单调队列队首元素
        if (i + 1 >= k) ans.push(nums[queue[0]])
    }

    return ans
};

console.log(
    maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3),
    maxSlidingWindow([1], 1),
    maxSlidingWindow([1, -1], 1),
    maxSlidingWindow([14,2,27,-5,28,13,39],3)
);
