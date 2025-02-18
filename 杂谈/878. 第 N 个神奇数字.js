/**
 * 一个正整数如果能被 a 或 b 整除，那么它是神奇的。

给定三个整数 n , a , b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 109 + 7 取模 后的值。

 

示例 1：

输入：n = 1, a = 2, b = 3
输出：2
示例 2：

输入：n = 4, a = 2, b = 3
输出：6
 

提示：

1 <= n <= 109
2 <= a, b <= 4 * 104
 
 */

const MOD = 1000000007;

const gcb = (a, b) => {
    if (b === 0) return a;
    return gcb(b, a % b);
}
const lcm = (a, b) => {
    return a * b / gcb(a, b);
}

/**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var nthMagicalNumber = function (n, a, b) {
    let l = Math.min(a, b);
    let r = n * Math.min(a, b);

    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / lcm(a, b));
        if (cnt < n) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return l % MOD;
};

console.log(nthMagicalNumber(1, 2, 3)); // 2
console.log(nthMagicalNumber(4, 2, 3)); // 6
console.log(nthMagicalNumber(5, 2, 4)); // 10