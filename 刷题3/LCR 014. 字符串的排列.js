/**
 * 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的某个变位词。

换句话说，第一个字符串的排列之一是第二个字符串的 子串 。

 

示例 1：

输入: s1 = "ab" s2 = "eidbaooo"
输出: True
解释: s2 包含 s1 的排列之一 ("ba").
示例 2：

输入: s1= "ab" s2 = "eidboaoo"
输出: False
 

提示：

1 <= s1.length, s2.length <= 104
s1 和 s2 仅包含小写字母
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion1 = function (s1, s2) {
    const s1Map = new Map()
    for (let i = 0; i < s1.length; i++) {
        s1Map.set(s1[i], (s1Map.get(s1[i]) ?? 0) + 1)
    }
    for (let right = 0; right <= s2.length - s1.length; right++) {
        let start = 0;
        const curMap = new Map(s1Map)
        while (start < s1.length) {
            const char = s2[right + start]
            if (!curMap.has(char)) break
            const count = curMap.get(char)
            if (count === 1) {
                curMap.delete(char)
            } else {
                curMap.set(char, count - 1)
            }
            start++
        }
        if (curMap.size === 0) return true
    }
    return false
};

var checkInclusion = function (s1, s2) {
    const s1Len = s1.length
    if (s1Len > s2.length) return false;
    const s1Count = new Array(26).fill(0) // s1中每个字母的个数
    const windowCountInS2 = new Array(26).fill(0) // 窗口中每个字母的个数
    // const matchCount = 0
    const aCode = 'a'.charCodeAt()
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1[i].charCodeAt() - aCode]++
    }
    for (let right = 0, left = 0; right < s2.length; right++) {
        windowCountInS2[s2[right].charCodeAt() - aCode]++
        // 到达窗口的宽度了
        if (right - left >= s1Len - 1) {
            // console.log(s1Count.join(''), windowCountInS2.join(''))
            if (s1Count.join('') === windowCountInS2.join('')) {
                return true
            }
            windowCountInS2[s2[left].charCodeAt() - aCode]--
            left++;
        }
    }
    return false
};


console.log(checkInclusion('ab', 'eidbaooo'))
console.log(checkInclusion('ab', 'eidboaoo'))
console.log(checkInclusion('abc', 'bbbca'))