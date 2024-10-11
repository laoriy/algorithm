/**
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

 

示例 1:

输入: s = "abab"
输出: true
解释: 可由子串 "ab" 重复两次构成。
示例 2:

输入: s = "aba"
输出: false
示例 3:

输入: s = "abcabcabcabc"
输出: true
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    for (let i = 1; i * 2 <= s.length; i++) {
        let str = s.slice(0, i);
        console.log(str);

        let reg = new RegExp(str, 'g');
        if (s.replace(reg, '') === '') {
            return true;
        }
    }
    return false;
};

var repeatedSubstringPattern = function (s) {
    let s1 = (s + s).slice(1, -1);
    return s1.indexOf(s) != -1;
}
// 以上暴力解法会超时
console.log(repeatedSubstringPattern('a'), repeatedSubstringPattern('ab'), repeatedSubstringPattern('bb'))