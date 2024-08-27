/**
 * 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

示例 1：

输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
输出：8
解释：能够达到的最大利润:  
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
示例 2：

输入：prices = [1,3,7,5,10,3], fee = 3
输出：6
 */

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
    // 第i天 不持有股票dp[i][0]的最大利润 和持有股票的最大利润 dp[i][1]
    // 1. 不持有股票dp[i][0] 前一天就没有持有，当天也没有买入 | 前一天持有股票，当天卖出 dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
    // 2. 持有股票dp[i][1] 前一天持有股票，当天不卖出 | 前一天没有持有股票，当天买入 dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    let len = prices.length
    const dp = new Array(len).fill(0).map(() => new Array(2).fill(0))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for(let i = 1; i < len; i++){
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee)
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
    }
    return Math.max(dp[len - 1][0], dp[len - 1][1])
};

console.log(
    maxProfit([1, 3, 2, 8, 4, 9], 2),
    maxProfit([1, 3, 7, 5, 10, 3], 3)
);