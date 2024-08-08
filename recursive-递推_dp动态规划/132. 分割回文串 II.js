/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是
回文串
。

返回符合要求的 最少分割次数 。

 

示例 1：

输入：s = "aab"
输出：1
解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
示例 2：

输入：s = "a"
输出：0
示例 3：

输入：s = "ab"
输出：1
 */

function isHuiwen(s, i, j) {
    while (i <= j) {
        if (s[i] !== s[j]) {
            return false
        }
        i++
        j--
    }
    return true
}

/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
    /**
     *     f(i,j) 表示 s[i..j] 是否为回文串，那么有状态转移方程：
    
    f(i,j)=  True,i≥j  ||   f(i+1,j−1)∧(s[i]=s[j]), otherwise
    ​
    其中 ∧ 表示逻辑与运算，即 s[i..j] 为回文串，当且仅当其为空串（i>j），其长度为 1（i=j），或者首尾字符相同且 s[i+1..j−1] 为回文串。
    
    预处理完成之后，我们只需要 O(1) 的时间就可以判断任意 s[i..j] 是否为回文串了。
    
     */
    let n = s.length
    const f = new Array(n).fill(0).map(() => new Array(n).fill(true));
    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1];
        }
    }
    // dp[i] 以i结尾的字符串最少切几刀可以分割成回文串
    const dp = [0]
    for (let i = 1; i <= n; i++) {
        dp[i] = i
        for (let j = 0; j < i; j++) {
            if (f[j][i - 1]) {
                dp[i] = Math.min(dp[i], dp[j] + 1)
            }
        }
    }
    return dp[n] - 1
};

console.log(minCut("aab"), minCut("bb"));