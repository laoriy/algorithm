/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。

 

注意：

对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
如果 s 中存在这样的子串，我们保证它是唯一的答案。
 

示例 1：

输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
示例 2：

输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。
示例 3:

输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
 
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (s.length < t.length) return '';

    const tCountMap = new Map(); // 记录t中每个字符的个数
    let count = 0 // 记录当前滑动窗口中 缺少的t中字符的个数
    for (n of t) {
        tCountMap.set(n, (tCountMap.get(n) || 0) + 1);
        if (tCountMap.get(n) === 1) count++;
    }

    let l = 0, r = 0;

    let ansLen = s.length + 1, ans = '';

    while (r <= s.length) {
        if (count) {
            if (r === s.length) break;
            const c = s[r]; // 要加入窗口的字符

            if (tCountMap.has(c)) tCountMap.set(c, tCountMap.get(c) - 1);
            if (tCountMap.get(c) === 0) count--; // 当前字符已经满足条件

            r++;
        } else {
            const c = s[l]; // 要移出窗口的字符
            if (tCountMap.has(c)) tCountMap.set(c, tCountMap.get(c) + 1);
            if (tCountMap.get(c) === 1) count++;

            l++;
        }
        if (count === 0 && r - l < ansLen) {
            ansLen = r - l;
            ans = s.slice(l, ansLen + l);
        }
    }
    return ans
};


console.log(minWindow("ADOBECODEBANC", "ABC")) // BANC
console.log(minWindow("a", "a")) // a
console.log(minWindow("a", "aa")) // ''
console.log(minWindow("abcccc", "abc")) // ''