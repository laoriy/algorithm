/**
 * 518. 零钱兑换 II

给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。

假设每一种面额的硬币有无限个。 

题目数据保证结果符合 32 位带符号整数。

示例 1：

输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
示例 2：

输入：amount = 3, coins = [2]
输出：0
解释：只用面额 2 的硬币不能凑成总金额 3 。
示例 3：

输入：amount = 10, coins = [10] 
输出：1
 */

//! 选取硬币的组合数，考虑顺序
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
    const f = new Array(amount + 1).fill(0) // f[i] 金额之和等于 i 的硬币组合数
    f[0] = 1
    for (let j = 0; j < coins.length; j++) {
        let coin = coins[j]
        for (let i = coin; i <= amount; i++) {
            let diff = i - coin //! 如果存在一种硬币组合的金额之和等于 i−coin，则在该硬币组合中增加一个面额为 coin 的硬币
            f[i] = f[i] + f[diff]
        }
    }

    return f[amount]
};


console.log(change(5, [1, 2, 5]), change(4, [1, 2, 3]));


//! 注意对比 377. 组合总和 Ⅳ 和 518. 零钱兑换 II