/**
 * 实现 pow(x, n) ，即计算 x 的整数 n 次幂函数（即，xn ）。

 

示例 1：

输入：x = 2.00000, n = 10
输出：1024.00000
示例 2：

输入：x = 2.10000, n = 3
输出：9.26100
示例 3：

输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
 */

// 这是递归版本的快速幂算法
function pow(x, n) {
    if (n === 0) return 1

    const half = Math.floor(n / 2)
    const y = pow(x, half)

    return n % 2 === 0 ? y * y : y * y * x
}


// 这是迭代版本的快速幂算法

function pow(x, n) {
    let i = x // 迭代贡献值
    let ans = 1
    while (n) {
        if (n & 1) ans *= i
        i *= i
        n = n >> 1
    }
    return ans
}

// 这是迭代版本的快速幂算法2

function pow(x, n) {
    let i = x // 迭代贡献值
    let ans = 1
    while (n) {
        if (n % 2 === 1) ans *= i
        i *= i
        n = Math.floor(n / 2)
    }
    return ans
}

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    return n < 0 ? 1 / pow(x, -n) : pow(x, n)
};

console.log(myPow(2.00000, 10))
console.log(myPow(2.10000, 3))
console.log(myPow(2.00000, -2))

