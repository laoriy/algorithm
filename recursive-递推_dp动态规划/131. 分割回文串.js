/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 
回文串
 。返回 s 所有可能的分割方案。

 

示例 1：

输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
示例 2：

输入：s = "a"
输出：[["a"]]
 */


/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const res = []
    const ret = []
    const len = s.length;
    const f = new Array(len).fill(0).map(() => new Array(len).fill(true))
    for (let i = len - 1; i >= 0; i--) {
        for (let j = i + 1; j < len; j++) {
            f[i][j] = (s[i] === s[j]) && f[i + 1][j - 1]
        }
    }

    function dfs(n) {
        if (n === len) {
            ret.push([...res])
            return
        }
        for (let i = n; i < len; i++) {
            if (!f[n][i]) continue
            res.push(s.slice(n, i + 1))
            dfs(i + 1)
            res.pop()
        }
    }
    dfs(0)

    return ret
};


console.log(partition("aab"));