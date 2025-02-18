/**
 * 你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。

 

示例 1：

输入：a = 2, b = [3]
输出：8
示例 2：

输入：a = 2, b = [1,0]
输出：1024
示例 3：

输入：a = 1, b = [4,3,3,8,5,2]
输出：1
示例 4：

a的2次方 * a的五十次方

输入：a = 2147483647, b = [2,0,0]
输出：1198
 */


const mode = BigInt(1337);

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function (a, b) {
    let ans = BigInt(1);
    for (let i = b.length - 1; i >= 0; i--) {
        ans = ans * pow(BigInt(a), b[i]) % mode;
        a = pow(BigInt(a), 10);
    }
    return ans
};

// 快速幂算法

function pow(x, n) {
    let ans = BigInt(1);
    while(n){
        if(n % 2 === 1) ans = ans * x % mode;
        x = x * x % mode;
        n = Math.floor(n / 2);
    }
    return ans
}

console.log(superPow(2, [3])); // 8
console.log(superPow(2, [1,0])); // 1024
console.log(superPow(1, [4,3,3,8,5,2])); // 1
console.log(superPow(2147483647, [2,0,0])); // 1198