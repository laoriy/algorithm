/**
 * 给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

如果不存在这样的子字符串，则返回 0。
 */

/**
 * 示例 1：

输入：s = "aaabb", k = 3
输出：3
解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。
示例 2：

输入：s = "ababbc", k = 2
输出：5
解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 */


/**
 * 题解
 * 找出每一个不符合条件（字符出现字数小于k）的字符的分割点，然后再在每个分割点内进行递归求解，
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {

    const countMap = new Map()
    for (let i = 0; i < s.length; i++) {
        countMap.set(s[i], (countMap.get(s[i]) ?? 0) + 1)
    }
    const splitIndexArr = [] // 分割点位置
    for (let i = 0; i < s.length; i++) {
        if (countMap.get(s[i]) < k) splitIndexArr.push(i)
    }
    splitIndexArr.push(s.length)

    if (splitIndexArr.length === 1) return s.length
    let pre = 0, max = 0
    for (let i of splitIndexArr) {
        let len = i - pre
        if (len >= k) max = Math.max(max, longestSubstring(s.substr(pre, len), k))
        pre = i + 1
    }
    return max
};

console.log(
    longestSubstring('aaabb', 3),
    longestSubstring('ababbc', 2),
);