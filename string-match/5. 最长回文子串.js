/**
 * 给你一个字符串 s，找到 s 中最长的 
回文子串
。

 

示例 1：

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：

输入：s = "cbbd"
输出："bb"
 

提示：

1 <= s.length <= 1000
s 仅由数字和英文字母组成
 */


function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--
        right++
    }
    return right - left - 1
}
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    if (!s || s.length < 1) return "";
    let start = 0, end = 0
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(s, i, i)
        const len2 = expandAroundCenter(s, i, i + 1)
        const len = Math.max(len1, len2)
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2)
            end = i + Math.floor(len / 2)
        }
    }
    return s.substring(start, end + 1)
};