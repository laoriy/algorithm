/**
 * 402. 移掉 K 位数字

给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。

 
示例 1 ：

输入：num = "1432219", k = 3
输出："1219"
解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
示例 2 ：

输入：num = "10200", k = 1
输出："200"
解释：移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
示例 3 ：

输入：num = "10", k = 2
输出："0"
解释：从原数字移除所有的数字，剩余为空就是 0 。
 */

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
    if (k >= num.length) return '0'

    // 单调栈
    const stack = []

    for (let i = 0; i < num.length; i++) {
        while (k && stack.length && stack[stack.length - 1] > num[i]) {
            stack.pop() // 每次尽可能的弹出一个大的值
            k--
        }
        if (!(num[i] === '0' && stack.length === 0)) {
            stack.push(num[i]);
        }
    }

    while(k){
        stack.pop()
        k--
    }
    return stack.length == 0 ? "0" : stack.join('');
};


console.log(removeKdigits("1432219",3));