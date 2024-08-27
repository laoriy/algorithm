/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。

 

示例 1：

输入：coins = [1, 2, 5], amount = 11
输出：3 
解释：11 = 5 + 5 + 1
示例 2：

输入：coins = [2], amount = 3
输出：-1
示例 3：

输入：coins = [1], amount = 0
输出：0
 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity) // 到达每个总额所需要的最小硬币数

    dp[0] = 0

    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < coins.length; j++) {
            const coinValue = coins[j] //遍历每个硬币的数值
            if (coinValue <= i) { // 这枚硬币小于当前总额
                dp[i] = Math.min(dp[i], dp[i - coinValue] + 1)
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
};

// 上面的方法是动态规划， 下面用深度优先遍历进行操作一次

var coinChange = function (coins, amount) {


    let cache = new Map()
    function dfs(amount) {
        if (amount === 0) {
            return 0
        }
        if (amount < 0) return -1


        if (cache.has(amount)) {
            return cache.get(amount)
        }

        let minCount = Infinity;

        for (let i = 0; i < coins.length; i++) {
            subCount = dfs(amount - coins[i])
            if (subCount === -1) continue
            minCount = Math.min(minCount, subCount + 1)
        }
        // 存储当前总金额的计算结果
        cache.set(amount, minCount)
        // 返回结果
        return minCount
    }

    let ans = dfs(amount)
    return ans === Infinity ? -1 : ans
};


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity) // dp[i]达成i 需要的最小硬币数
    dp[0] = 0

    for (let i = 0; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            const coin = coins[j]
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount]
};

console.log(
    coinChange([1, 2, 5], 11),
    coinChange([2], 3),
    coinChange([1], 0)
)


