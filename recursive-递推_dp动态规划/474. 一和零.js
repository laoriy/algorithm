/**
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n 。

请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。

如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。

 

示例 1：

输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3
输出：4
解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。
其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。
示例 2：

输入：strs = ["10", "0", "1"], m = 1, n = 1
输出：2
解释：最大的子集是 {"0", "1"} ，所以答案是 2 。
 */

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
    const dp = new Array(strs.length + 1).fill(0).map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)))  // dp[i][m][n] 前i个字符，最多m个0，最多n个1的最大子集长度..对于当前i串，选或者不选

    for (let i = 1; i <= strs.length; i++) {
        const str = strs[i - 1]

        let [mCount, nCount] = getZerosOnes(str);

        for (let j = 0; j <= m; j++) {
            for (let k = 0; k <= n; k++) {
                dp[i][j][k] = dp[i - 1][j][k];
                if (j >= mCount && k >= nCount) {
                    dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - mCount][k - nCount] + 1);
                }
            }
        }
    }

    return dp[strs.length][m][n]
};

const getZerosOnes = (str) => {
    let mCount = 0, nCount = 0
    for (let j = 0; j < str.length; j++) {
        if (str[j] === '0') mCount++
        if (str[j] === '1') nCount++
    }
    return [mCount, nCount]

}

// var findMaxForm = function(strs, m, n) {
//     const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
//     const length = strs.length;
//     for (let i = 0; i < length; i++) {
//         const zerosOnes = getZerosOnes(strs[i]);
//         const zeros = zerosOnes[0], ones = zerosOnes[1];
//         for (let j = m; j >= zeros; j--) {
//             for (let k = n; k >= ones; k--) {
//                 dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1);
//             }
//         }
//     }
//     return dp[m][n];
// };



console.log(
    findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3),
    findMaxForm(["11111", "100", "1101", "1101", "11000"], 5, 7)
);