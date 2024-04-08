/**
 * 42. 接雨水

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

 

示例 1：


输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
示例 2：

输入：height = [4,2,0,3,2,5]
输出：9
 */

/**
 * Calculates the amount of water that can be trapped within the given heights.
 *
 * @param {number[]} height - An array of heights representing the elevation map
 * @return {number} The total amount of water that can be trapped
 */
function trap(height) {
    let ans = 0;
    let stack = [] // 单调递减栈

    for (let i = 0; i < height.length; i++) {
        while (stack.length && height[stack[stack.length - 1]] < height[i]) {
            let now = stack.pop() //

            if (stack.length === 0) continue;
            let top = stack[stack.length - 1]
            let a = height[i] - height[now]
            let b = height[top] - height[now]
            ans += (i - top - 1) * Math.min(a, b)
        }
        stack.push(i)
    }

    return ans;
};

console.log(
    trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]),
    trap([4, 2, 0, 3, 2, 5])
)