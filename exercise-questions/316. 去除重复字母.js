/**
 * 316. 去除重复字母

给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的
字典序
最小（要求不能打乱其他字符的相对位置）。

 

示例 1：

输入：s = "bcabc"
输出："abc"
示例 2：

输入：s = "cbacdcbc"
输出："acdb"
 
 */

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
    let stack = [] // 用一个单调增栈，保证小的尽可能放前面
    for (let i = 0; i < s.length; i++) {
        const v = s[i]
        while (stack.length && v < stack[stack.length - 1] && s.includes(stack[stack.length - 1], i + 1) && !stack.includes(v)) {
            stack.pop()
        }
        if (!stack.includes(v)) stack.push(v)
    }
    return stack.join('')
};