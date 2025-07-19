/**
 * 如果整数  x 满足：对于每个数位 d ，这个数位 恰好 在 x 中出现 d 次。那么整数 x 就是一个 数值平衡数 。

给你一个整数 n ，请你返回 严格大于 n 的 最小数值平衡数 。

 

示例 1：

输入：n = 1
输出：22
解释：
22 是一个数值平衡数，因为：
- 数字 2 出现 2 次 
这也是严格大于 1 的最小数值平衡数。
示例 2：

输入：n = 1000
输出：1333
解释：
1333 是一个数值平衡数，因为：
- 数字 1 出现 1 次。
- 数字 3 出现 3 次。 
这也是严格大于 1000 的最小数值平衡数。
注意，1022 不能作为本输入的答案，因为数字 0 的出现次数超过了 0 。
示例 3：

输入：n = 3000
输出：3133
解释：
3133 是一个数值平衡数，因为：
- 数字 1 出现 1 次。
- 数字 3 出现 3 次。 
这也是严格大于 3000 的最小数值平衡数。

0 <= n <= 10^6
 */


function isBalance(n) {
    let count = new Array(10).fill(0) // 0-9的个数
    while (n) {
        const digit = n % 10
        count[digit] += 1;
        n = Math.floor(n / 10);
    }
    for (let i = 0; i < count.length; i++) {
        if (count[i] && count[i] !== i) return false
    }
    return true
}

/**
 * @param {number} n
 * @return {number}
 */
var nextBeautifulNumber = function (n) {
    // 大于10的6次方的最小平衡数为1224444
    for (let i = n + 1; i <= 1224444; i++) {
        if (isBalance(i)) return i
    }
    return -1
};

console.log(nextBeautifulNumber(1))
console.log(nextBeautifulNumber(1000))
console.log(nextBeautifulNumber(3000))