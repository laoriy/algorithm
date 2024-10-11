/**
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。如果 needle 不是 haystack 的一部分，则返回  -1 。

 

示例 1：

输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
示例 2：

输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
 */


/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const lastPosition = new Map();
    // 记录模式串每个字符最后出现的位置
    for (let i = 0; i < needle.length; i++) {
        lastPosition.set(needle[i], i);
    }

    for (let i = 0; i < haystack.length - needle.length + 1;) {
        let j = 0;
        while(j < needle.length && needle[j] === haystack[i + j]) {
            j++;
        }
        if(j === needle.length) {
            return i;
        }
        const nextChar = haystack[i + needle.length];
        if(lastPosition.has(nextChar)) {
            i += needle.length - lastPosition.get(nextChar);
        } else {
            i += needle.length + 1;
        }
    }
    return -1;
};

console.log(strStr("hello", "ll"));