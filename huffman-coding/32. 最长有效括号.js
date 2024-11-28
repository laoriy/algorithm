/**
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号
子串
的长度。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0
 */

// 动态规划
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    const dp = new Array(s.length).fill(0); // dp[i] 表示以 i 结尾的最长有效括号的长度
    let max = 0

    for (let i = 1; i < s.length; i++) {
        if (s[i] === '(') {
            continue
        } else {
            if (s[i - 1] === '(') {
                dp[i] = (dp[i - 2] || 0) + 2;
            } else {
                const preLeft = i - dp[i - 1] // 与当前右括号匹配的左括号的位置
                if (preLeft > 0 && s[preLeft - 1] === '(') {
                    dp[i] = dp[i - 1] + (preLeft >= 2 ? dp[preLeft - 2] : 0) + 2;
                }
            }
        }
        max = Math.max(max, dp[i])
    };
    return max

}

// 栈的方式
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    // 栈的方式
    const stack = [-1] // 栈底元素是-1，代表最后一个没有匹配的右括号的位置
    let max = 0
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i)
        } else {
            stack.pop()
            if (stack.length === 0) {
                stack.push(i) // 代表当前右括号没有匹配的左括号
            } else {
                max = Math.max(max, i - stack[stack.length - 1])
            }
        }
    }
    return max
};


console.log(longestValidParentheses("(()")) // 2
console.log(longestValidParentheses(")()())")) // 4


