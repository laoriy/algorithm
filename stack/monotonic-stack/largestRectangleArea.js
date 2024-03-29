/**
 * 84. 柱状图中最大的矩形
给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。
 */
/**
 * Calculate the largest rectangle area based on the given heights array.
 *
 * @param {number[]} heights - An array of heights
 * @return {number} The largest rectangle area
 */
function largestRectangleArea(heights) {
    const nextQueue = new Array(heights.length).fill(heights.length) // 后面第一个比自己小的元素下标
    const preQueue = new Array(heights.length).fill(-1) // 前面第一个比自己小的元素下标
    let ans = 0
    let stack = [] // 单调递增栈
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[stack[stack.length - 1]] > heights[i]) {
            let top = stack.pop()
            nextQueue[top] = i
        }
        if (stack.length) preQueue[i] = stack[stack.length - 1]
        stack.push(i)
    }

    for (let index = 0; index < heights.length; index++) {
        let width = nextQueue[index] - preQueue[index] - 1
        ans = Math.max(ans, width * heights[index])
    }
    return ans;

};

console.log(
    largestRectangleArea([2, 1, 5, 6, 2, 3]),
    largestRectangleArea([2, 4]),
    largestRectangleArea([1, 1])
);