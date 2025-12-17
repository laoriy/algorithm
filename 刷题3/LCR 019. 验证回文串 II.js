/**
 * 给定一个非空字符串 s，请判断如果 最多 从字符串中删除一个字符能否得到一个回文字符串。

 

示例 1：

输入: s = "aba"
输出: true
示例 2：

输入: s = "abca"
输出: true
解释: 可以删除 "c" 字符 或者 "b" 字符
示例 3：

输入: s = "abc"
输出: false
 

提示：

1 <= s.length <= 105
s 由小写英文字母组成
 
 */


/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    function check(left, right, isDel) {
        while (left < right) {
            const cL = s[left], cR = s[right]
            if (cL === cR) {
                left++
                right--
            } else if (isDel) {
                return false
            } else {
                return check(left, right - 1, true) || check(left + 1, right, true)
            }
        }
        return true
    }
    return check(0, s.length - 1, false)
};

console.log(validPalindrome('aba'))
console.log(validPalindrome('abca'))
console.log(validPalindrome('abc'))
console.log(validPalindrome('eeccccbebaeeabebccceea'))
console.log(validPalindrome('ebcbbececabbacecbbcbe')) // ebcbbececabbacecbbcbe