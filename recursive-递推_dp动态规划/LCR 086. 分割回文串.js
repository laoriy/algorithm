/**
 * 给定一个字符串 s ，请将 s 分割成一些子串，使每个子串都是 回文串 ，返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

 

示例 1：

输入：s = "google"
输出：[["g","o","o","g","l","e"],["g","oo","g","l","e"],["goog","l","e"]]
示例 2：

输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
示例 3：

输入：s = "a"
输出：[["a"]]
 */

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const n = s.length;

    const f = new Array(n).fill(0).map(() => new Array(n).fill(true))

    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            f[i][j] = s[i] === s[j] && f[i + 1][j - 1];
        }
    }

    const ans = [];

    const ret = []


    function dfs(i) {
        if (i === n) {
            ans.push(ret.slice());
            return;
        }
        for (let j = i; j < n; j++) {
            if (f[i][j]) {
                ret.push(s.slice(i, j + 1));
                dfs(j + 1);
                ret.pop();
            }
        }
    }
    dfs(0)
    return ans;
};

console.log(partition("google"));