/*
739. 每日温度

给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:

输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
示例 2:

输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
示例 3:

输入: temperatures = [30,60,90]
输出: [1,1,0]

*/


/**
 * Calculate the number of days you would have to wait until a warmer temperature for each day in the given array of temperatures.
 *
 * @param {number[]} temperatures - An array of temperatures for each day
 * @return {number[]} An array representing the number of days to wait until a warmer temperature for each day
 */
function dailyTemperatures(temperatures) {
    // 找到后面第一个比他大的元素
    let ans = new Array(temperatures.length).fill(0)
    const queue = [] // 单调递减栈
    for(let i = 0;i<temperatures.length;i++){
        while(queue.length && temperatures[queue[queue.length-1]] < temperatures[i]){
            // 这里找到了比栈顶元素大的值
            let index = queue.pop() // 栈顶元素所在位置
            ans[index] = i - index // 栈顶元素距离这个比他大的值的位置
        }
        queue.push(i)
    }
    return ans;
};

console.log(
    dailyTemperatures([73,74,75,71,69,72,76,73]),
    dailyTemperatures([30,40,50,60]),
    dailyTemperatures([30,60,90]),
)