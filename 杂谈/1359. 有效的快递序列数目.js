/**
 * 给你 n 笔订单，每笔订单都需要快递服务。

计算所有有效的 取货 / 交付 可能的顺序，使 delivery(i) 总是在 pickup(i) 之后。

由于答案可能很大，请返回答案对 10^9 + 7 取余的结果。

 

示例 1：

输入：n = 1
输出：1
解释：只有一种序列 (P1, D1)，物品 1 的配送服务（D1）在物品 1 的收件服务（P1）后。
示例 2：

输入：n = 2
输出：6
解释：所有可能的序列包括：
(P1,P2,D1,D2)，(P1,P2,D2,D1)，(P1,D1,P2,D2)，(P2,P1,D1,D2)，(P2,P1,D2,D1) 和 (P2,D2,P1,D1)。
(P1,D2,P2,D1) 是一个无效的序列，因为物品 2 的收件服务（P2）不应在物品 2 的配送服务（D2）之后。
示例 3：

输入：n = 3
输出：90
 */
/**
 * @param {number} n
 * @return {number}
 */
var countOrders = function (n) {
    // 对于第i个订单
    // 连着的为2(i-1) + 1 = 2i - 1
    // 不连的为(2i - 1)* (i - 1) 

    // 得出 (2i - 1) + (2i - 1) * (i - 1) = (2i - 1) * i
    const MOD = 1000000007;
    let dp = new Array(n + 1).fill(0);
    dp[0] = dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] * i * (2 * i - 1) % MOD;
    }
    return dp[n];
};

console.log(countOrders(3)); // 90
console.log(countOrders(2)); // 6
console.log(countOrders(1)); // 1