/**
 * 给你一个整数 num 。重排 num 中的各位数字，使其值 最小化 且不含 任何 前导零。

返回不含前导零且值最小的重排数字。

注意，重排各位数字后，num 的符号不会改变。

 

示例 1：

输入：num = 310
输出：103
解释：310 中各位数字的可行排列有：013、031、103、130、301、310 。
不含任何前导零且值最小的重排数字是 103 。
示例 2：

输入：num = -7605
输出：-7650
解释：-7605 中各位数字的部分可行排列为：-7650、-6705、-5076、-0567。
不含任何前导零且值最小的重排数字是 -7650 。
 

提示：

-10^15 <= num <= 10^15
 */

/**
 * @param {number} num
 * @return {number}
 */
var smallestNumber = function (num) {
    if (num === 0) return 0
    const flag = num < 0 ? -1 : 1
    num = num * flag
    const numCount = new Array(10).fill(0)
    let ans = 0
    while (num) {
        const digit = num % 10
        // 如果是正数，就找到非0的最小的值
        if (flag === 1 && digit && (digit < (ans || 10))) ans = digit
        numCount[digit] += 1
        num = Math.floor(num / 10)
    }
    if (flag === 1 && ans) numCount[ans] -= 1
    // console.log(numCount, ans)
    for (let i = 0; i < numCount.length; i++) {
        let index = flag === -1 ? 9 - i : i
        if (numCount[index] === 0) continue;
        // console.log(numCount[index], index)
        ans = ans + index.toString().repeat(numCount[index])
    }
    return flag * ans
};


// console.log(smallestNumber(310))
// console.log(smallestNumber(-7605))
// console.log(smallestNumber(1384))
// console.log(smallestNumber(99999999999999))
console.log(smallestNumber(900000000000000))