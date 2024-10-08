/**
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

 

示例 1：

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。
示例 2：

输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc" ，它的长度为 3 。
示例 3：

输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0 。
 */



// 经典的二维动态规划

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const m = text1.length, n = text2.length;
    dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)); // dp[i][j] 表示 text1 的前 i 个字符和 text2 的前 j 个字符的最长公共子序列的长度

    /**
     * 状态转移方程
     * dp[i][j]，text1前i个，text2前j个的最长公共子序列(LCS)长度。 边界: dp[i][0] = dp[0][j] = 0 空串与任意串的LCS长度为0 (二维矩阵上的第一行和第一列，默认为0无需显式写出) 递推: dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) (当前字符不相同) dp[i - 1][j - 1] + 1 (当前字符相同)
     */

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[m][n]

};

console.log(
    longestCommonSubsequence("abcde", "ace")

)