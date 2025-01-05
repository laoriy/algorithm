/**
 * 请你帮忙给从 1 到 n 的数设计排列方案，使得所有的「质数」都应该被放在「质数索引」（索引从 1 开始）上；你需要返回可能的方案总数。

让我们一起来回顾一下「质数」：质数一定是大于 1 的，并且不能用两个小于它的正整数的乘积来表示。

由于答案可能会很大，所以请你返回答案 模 mod 10^9 + 7 之后的结果即可。

 

示例 1：

输入：n = 5
输出：12
解释：举个例子，[1,2,5,4,3] 是一个有效的排列，但 [5,2,3,4,1] 不是，因为在第二种情况里质数 5 被错误地放在索引为 1 的位置上。
示例 2：

输入：n = 100
输出：682289015
 */




/**
 * 计算质数的数量
 * 
 */
function countPrime(n) {
    let ans = 0;
    const isPrime = new Array(n + 1).fill(true); // true 代表是质数
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            ans += 1;
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return ans;
}

function factorial(n) {
    let ans = BigInt(n);
    while (n > 1) {
        ans = (ans * BigInt(--n))
    }
    return ans;
}

/**
 * @param {number} n
 * @return {number}
 */
var numPrimeArrangements = function (n) {
    if(n <= 1) return n;
    // 求质数的数量，剩下的是合数的数量，然后两个排列乘起来
    const primeCount = countPrime(n);
    const mod = BigInt(1000000007);
    return Number(factorial(primeCount) * factorial(n - primeCount) % mod);

};

console.log(numPrimeArrangements(5)); // 12
console.log(numPrimeArrangements(100)); // 682289015
console.log(numPrimeArrangements(1)); // 1