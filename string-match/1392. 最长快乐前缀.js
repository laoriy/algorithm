/**
 * 快乐前缀」 是在原字符串中既是 非空 前缀也是后缀（不包括原字符串自身）的字符串。

给你一个字符串 s，请你返回它的 最长快乐前缀。如果不存在满足题意的前缀，则返回一个空字符串 "" 。

 

示例 1：

输入：s = "level"
输出："l"
解释：不包括 s 自己，一共有 4 个前缀（"l", "le", "lev", "leve"）和 4 个后缀（"l", "el", "vel", "evel"）。最长的既是前缀也是后缀的字符串是 "l" 。
示例 2：

输入：s = "ababab"
输出："abab"
解释："abab" 是最长的既是前缀也是后缀的字符串。题目允许前后缀在原字符串中重叠。
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPrefix = function (s) {
    let n = s.length;
    let arr = new Array(n).fill(0);

    for (let i = 1, j = 0; i < n; i++) {
        while (j > 0 && s[i] != s[j]) {
            j = arr[j - 1];
        }
        if (s[i] == s[j]) {
            j++;
        }
        arr[i] = j;
    }
    return s.slice(0, arr[n - 1]);
};

/**
 * 上面是kmp 
 * 下面是暴力搜索
 */

var longestPrefix = function (s) {
    for (let i = s.length - 1; i > 0; i--) {
        if (s.slice(0, i) === s.slice(-i)) {
            return s.slice(0, i);
        }
    }
    return '';
}

console.log(longestPrefix("level"))