/**
 * 丑数是可以被 a 或 b 或 c 整除的 正整数 。

给你四个整数：n 、a 、b 、c ，请你设计一个算法来找出第 n 个丑数。

 

示例 1：

输入：n = 3, a = 2, b = 3, c = 5
输出：4
解释：丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。
示例 2：

输入：n = 4, a = 2, b = 3, c = 4
输出：6
解释：丑数序列为 2, 3, 4, 6, 8, 9, 10, 12... 其中第 4 个是 6。
示例 3：

输入：n = 5, a = 2, b = 11, c = 13
输出：10
解释：丑数序列为 2, 4, 6, 8, 10, 11, 12, 13... 其中第 5 个是 10。
 */
function getUglyCount(x, a, b, c) {
    const ab = lcm(a, b)
    const ac = lcm(a, c)
    const bc = lcm(b, c)
    const abc = lcm(ab, c)
    return x / a + x / b + x / c - x / ab - x / ac - x / bc + x / abc
}

/**
 * 最大公约数
 */
function gcb(a, b) {
    if (b === 0n) return a
    return gcb(b, a % b)
}
/**
 * 最小公倍数
 */
function lcm(a, b) {
    return a * b / gcb(a, b)
}


/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var nthUglyNumber = function (n, a, b, c) {
    let left = 0n, right = BigInt(n) * BigInt(Math.min(a, b, c));
    a = BigInt(a), b = BigInt(b), c = BigInt(c)

    while (left < right) {
        const mid = (left + right) / 2n
        const cnt = getUglyCount(mid, a, b, c)
        if (cnt < n) {
            left = mid + 1n
        } else {
            right = mid
        }
    }
    return Number(left)
};




console.log(nthUglyNumber(3, 2, 3, 5)) // 4
console.log(nthUglyNumber(4, 2, 3, 4)) // 6
console.log(nthUglyNumber(5, 2, 11, 13)) // 10