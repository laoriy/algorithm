/**
 * 
这里有 n 个一样的骰子，每个骰子上都有 k 个面，分别标号为 1 到 k 。

给定三个整数 n、k 和 target，请返回投掷骰子的所有可能得到的结果（共有 kn 种方式），使得骰子面朝上的数字总和等于 target。

由于答案可能很大，你需要对 109 + 7 取模。

 

示例 1：

输入：n = 1, k = 6, target = 3
输出：1
解释：你掷了一个有 6 个面的骰子。
得到总和为 3 的结果的方式只有一种。
示例 2：

输入：n = 2, k = 6, target = 7
输出：6
解释：你掷了两个骰子，每个骰子有 6 个面。
有 6 种方式得到总和为 7 的结果: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1。
示例 3：

输入：n = 30, k = 30, target = 500
输出：222616187
解释：返回的结果必须对 109 + 7 取模。
 

 */

const mod = 1000000007;

/**
 * @param {number} n
 * @param {number} k
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (n, k, target) {
    const dp = new Array(n + 1).fill(0).map(() => new Array(target + 1).fill(0)); // dp[i][j] 表示 i 个骰子和为 j 的方法数
    dp[0][0] = 1;
    for (let i = 1; i <= n; i++) {
        for (let j = i; j <= target; j++) {
            for (let s = 1; s <= k; s++) {
                if (j < s) break
                dp[i][j] += dp[i - 1][j - s]
                dp[i][j] %= mod;
            }
        }
    }
    return dp[n][target];
};

console.log(numRollsToTarget(1, 6, 3)); // 1
console.log(numRollsToTarget(2, 6, 7)); // 6
console.log(numRollsToTarget(30, 30, 500)); // 222616187