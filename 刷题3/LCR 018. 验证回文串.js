/**
 * 给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。

本题中，将空字符串定义为有效的 回文串 。

 

示例 1：

输入: s = "A man, a plan, a canal: Panama"
输出: true
解释："amanaplanacanalpanama" 是回文串
示例 2：

输入: s = "race a car"
输出: false
解释："raceacar" 不是回文串
 

提示：

1 <= s.length <= 2 * 105
字符串 s 由 ASCII 字符组成
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    let left = 0, right = s.length - 1
    const checkIsValid = (letter) => {
        return /[a-z|0-9]/.test(letter)
    }
    while (left < right) {
        const leftCode = s[left].toLowerCase(), rightCode = s[right].toLowerCase()
        // console.log(s[left], leftCode, s[right], rightCode)
        if (leftCode !== rightCode) {
            const leftIsLetter = checkIsValid(leftCode)
            const rightIsLetter = checkIsValid(rightCode)
            if (leftIsLetter && rightIsLetter) return false
            if (!leftIsLetter) left++
            if (!rightIsLetter) right--
        } else {
            left++
            right--
        }
    }
    return true
};

console.log(isPalindrome("A man, a plan, a canal: Panama"))
console.log(isPalindrome("race a car"))
console.log(isPalindrome("0P"))