/**
 * 1081. 不同字符的最小子序列

返回 s 字典序最小的
子序列
，该子序列包含 s 的所有不同字符，且只包含一次。

 

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
var smallestSubsequence = function (s) {

    const stack = []

    for (let i = 0; i < s.length; i++) {
        const v = s[i]
        // 如果当前要出栈的元素在后面还有 并且 栈里面不包含当前元素 才出栈
        while (stack.length && v < stack[stack.length - 1] && s.indexOf(stack[stack.length - 1], i + 1) !== -1 && stack.indexOf(v) === -1) {
            stack.pop()
        }
        if (stack.indexOf(v) === -1) stack.push(v) // 如果栈里面不包含当前要入栈的元素，才入栈
    }

    return stack.join('')

};

console.log(
    smallestSubsequence("bcabc"),
    smallestSubsequence("cbacdcbc"),
    smallestSubsequence("cbaacabcaaccaacababa"),
)