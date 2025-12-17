/**
 * 给定一个字符串 s ，请计算这个字符串中有多少个回文子字符串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

 

示例 1：

输入：s = "abc"
输出：3
解释：三个回文子串: "a", "b", "c"
示例 2：

输入：s = "aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 

提示：

1 <= s.length <= 1000
s 由小写英文字母组成
 */


/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    let ans = 0
    for (let i = 0; i < s.length; i++) {
        let left = i, right = i
        // 回文串是奇数个，以每个为中心向两边扩展
        while (s[left] && (s[left] === s[right])) {
            left--;
            right++
            ans++
        }
        // 回文串是偶数个， 以两个为中心向两边扩展
        left = i, right = i + 1
        while (s[left] && (s[left] === s[right])) {
            left--;
            right++
            ans++
        }
    }

    // console.log(ans)
    return ans
};

console.log(countSubstrings('abc'))
console.log(countSubstrings('aaa'))