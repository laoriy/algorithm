/**
 * 给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。

 

示例 1：

输入：words = ["abcw","baz","foo","bar","fxyz","abcdef"]
// 011000000000000000001000
// 110000000000000000000001
//
输出：16 
解释：这两个单词为 "abcw", "fxyz"。它们不包含相同字符，且长度的乘积最大。
示例 2：

输入：words = ["a","ab","abc","d","cd","bcd","abcd"]
输出：4 
解释：这两个单词为 "ab", "cd"。
示例 3：

输入：words = ["a","aa","aaa","aaaa"]
输出：0 
解释：不存在这样的两个单词。
 

提示：

2 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] 仅包含小写字母
 */

/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
        let binaryWords = []
        for (let word of words) {
            let arr = new Array(26).fill(0)
            for (let i = 0; i < word.length; i++) {
                let charIdx = word.charCodeAt(i) - 97
                arr[charIdx] = 1
            }
            binaryWords.push(parseInt(arr.join(''), 2))
        }
        let ans = 0
        for (let i = 0; i < words.length; i++) {
            const word = words[i]
            for (let j = i + 1; j < words.length; j++) {
                const compareWord = words[j]
                if ((binaryWords[i] & binaryWords[j]) === 0) {
                    ans = Math.max(ans, word.length * compareWord.length)
                }
            }
        }
        return ans
};

console.log(maxProduct(["abcw", "baz", "foo", "bar", "fxyz", "abcdef"]))
console.log(maxProduct(["a","ab","abc","d","cd","bcd","abcd"]))
console.log(maxProduct(["a","aa","aaa","aaaa"]))