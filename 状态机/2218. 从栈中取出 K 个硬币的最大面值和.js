/**
 * 一张桌子上总共有 n 个硬币 栈 。每个栈有 正整数 个带面值的硬币。

每一次操作中，你可以从任意一个栈的 顶部 取出 1 个硬币，从栈中移除它，并放入你的钱包里。

给你一个列表 piles ，其中 piles[i] 是一个整数数组，分别表示第 i 个栈里 从顶到底 的硬币面值。同时给你一个正整数 k ，请你返回在 恰好 进行 k 次操作的前提下，你钱包里硬币面值之和 最大为多少 。

 

示例 1：



输入：piles = [[1,100,3],[7,8,9]], k = 2
输出：101
解释：
上图展示了几种选择 k 个硬币的不同方法。
我们可以得到的最大面值为 101 。
示例 2：

输入：piles = [[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], k = 7
输出：706
解释：
如果我们所有硬币都从最后一个栈中取，可以得到最大面值和。
 */

/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function (piles, k) {
    // dp[i][j] 前i个栈，背包容量为j时，能取得的最大物品（面值）
    const dp = new Array(piles.length + 1).fill(null).map(() => new Array(k + 1).fill(0))
    for (let i = 1; i <= piles.length; i++) {
        const pile = piles[i - 1]
        for (let j = 1; j <= k; j++) {
            dp[i][j] = dp[i - 1][j]
            let chooseValue = 0
            for (let p = 1; p <= pile.length; p++) {
                const value = pile[p - 1]
                chooseValue += value
                if (p > j) break;
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - p] + chooseValue)
            }
        }
    }
    return dp[piles.length][k]
};

console.log(maxValueOfCoins([[1, 100, 3], [7, 8, 9]], 2))
console.log(maxValueOfCoins([[37,88],[51,64,65,20,95,30,26],[9,62,20],[44]], 9))
console.log(maxValueOfCoins([[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], 7))