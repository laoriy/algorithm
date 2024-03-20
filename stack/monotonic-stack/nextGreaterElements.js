/**
 * 503. 下一个更大元素 II

给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。

数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。

 

示例 1:

输入: nums = [1,2,1]
输出: [2,-1,2]
解释: 第一个 1 的下一个更大的数是 2；
数字 2 找不到下一个更大的数； 
第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
示例 2:

输入: nums = [1,2,3,4,3]
输出: [2,3,4,-1,4]
 */

/**
 * Generate the function comment for the given function body in a markdown code block with the correct language syntax.
 *
 * @param {number[]} nums - an array of numbers
 * @return {number[]} an array of numbers
 */
function nextGreaterElements(nums) {
    let n = 0;
    let stack = [] // 单调递减栈
    let nextNearlyMax = []
    while (n < nums.length) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[n]) {
            nextNearlyMax[stack.pop()] = nums[n]
        }

        stack.push(n)

        n++
    }
    // 剩余栈中  所在位置值后面没有比他更大的值，所以就再重新找一次
    while (stack.length) {
        let index = stack.pop() // 这是数组下标
        let indexValue = nums[index] //这个下标对应的值后面没有比它更大的值
        nextNearlyMax[index] = -1
        // 从头开始在数组里面找一个比他大的
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > indexValue) {
                nextNearlyMax[index] = nums[i];
                break;
            }
        }
    }
    return nextNearlyMax;
};

function nextGreaterElements2(nums) {
    let n = 0;
    let stack = [] // 单调递减栈
    let nextNearlyMax = Array(nums.length).fill(-1)
    while (n < nums.length * 2 - 1) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[n % nums.length]) {
            nextNearlyMax[stack.pop()] = nums[n % nums.length]
        }
        stack.push(n % nums.length)
        n++
    }
    return nextNearlyMax;
};


console.log(
    nextGreaterElements([1, 2, 1]),
    nextGreaterElements([1, 2, 3, 4, 3]),
    nextGreaterElements([5,4,3,2,1]),
    '-----> optimize:',
    nextGreaterElements2([1, 2, 1]),
    nextGreaterElements2([1, 2, 3, 4, 3]),
    nextGreaterElements2([5,4,3,2,1]),
);