/**
 * 解决 01 背包问题
 * @param {Array<Array<number>>} n - 每个物品的重量和价值组成的二维数组
 * @param {number} v - 背包的最大容量
 * @returns {number} - 最大可获得的价值
 */
function knapsack(n, v) {
    const len = n.length;
    const dp = new Array(len + 1).fill(0).map(() => new Array(v + 1).fill(0)) // 初始化 dp[i][j] 数组 表示前i个物品放入容量为j的背包的最大价值
    for (let i = 1; i <= len; i++) {
        for (let j = 1; j <= v; j++) {
            const [weight, value] = n[i - 1];
            if (j < weight) {
                dp[i][j] = dp[i - 1][j] // 当前物品重量大于背包容量，无法放入
            } else {
                // 选择当前物品与不选择当前物品的最大价值
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value)
            }
        }
    }
    return dp[len][v]
}

console.log(
    knapsack([[10, 60], [20, 100], [30, 120]], 50),
    knapsack([[1, 1], [2, 6], [5, 18], [6, 22], [7, 28]], 10),
    knapsack([[1, 1], [4, 4], [3, 4], [2, 1], [5, 10]], 20),
    knapsack([[1, 2], [2, 4], [3, 4], [4, 5]], 5)
);