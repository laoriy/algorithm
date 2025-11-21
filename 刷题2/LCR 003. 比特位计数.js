/**
 * 给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

 

示例 1:

输入: n = 2
输出: [0,1,1]
解释: 
0 --> 0
1 --> 1
2 --> 10
示例 2:

输入: n = 5
输出: [0,1,1,2,1,2]
解释:
0 --> 000
1 --> 001
2 --> 010
3 --> 011
4 --> 100
5 --> 101
 

说明 :

0 <= n <= 105
 */


/**
 * @param {number} n
 * @return {number[]}
 */
var countBits1 = function (n) {
    const ans = []
    for (let i = 0; i <= n; i++) {
        ans.push(i.toString(2).replaceAll('0', '').length)
    }
    return ans
};

// 动态规划
var countBits = function (n) {
    const ans = [0]
    for (let i = 1; i <= n; i++) {
        ans.push(i % 2 === 0 ? ans[i / 2] : ans[i - 1] + 1)
    }
    return ans
};

console.log(countBits(2))
console.log(countBits(5))
console.log(countBits(1000000))