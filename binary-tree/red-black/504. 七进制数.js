/**
 * 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。

 

示例 1:

输入: num = 100
输出: "202"
示例 2:

输入: num = -7
输出: "-10
 */


/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
    if (num === 0) return '0'

    let negative = num < 0;
    num = Math.abs(num)
    const ans = []
    while (num) {
        ans.unshift(num % 7)
        num = Math.floor(num / 7)
    }
    if (negative) ans.unshift('-')
    return ans.join('')
};

console.log(convertToBase7(-7), convertToBase7(100))