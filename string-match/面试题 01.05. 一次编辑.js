/**
 * 字符串有三种编辑操作:插入一个英文字符、删除一个英文字符或者替换一个英文字符。 给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

 

示例 1:

输入: 
first = "pale"
second = "ple"
输出: True
 

示例 2:

输入: 
first = "pales"
second = "pal"
输出: False
 */

/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
var oneEditAway = function (first, second) {
    if (first.length < second.length) {
        [first, second] = [second, first]; // 保证first是较长的字符串
    }

    const firstLen = first.length;
    const secondLen = second.length;
    if (firstLen > secondLen + 1) return false; // 长度差大于1，直接返回false
    if (firstLen === secondLen) { // 长度相等，判断是否只有一个字符不同
        let diffCount = 0
        for (let i = 0; i < firstLen; i++) {
            if (first[i] !== second[i]) diffCount++
            if (diffCount > 1) return false
        }
    }
    if (firstLen === secondLen + 1) { // 长度差为1，判断是否只有一个字符不同
        for (let i = 0, j = 0; j < secondLen; i++, j++) {
            if (first[i] !== second[j]) {
                return first.slice(i + 1) === second.slice(j)
            }
        }
    }
    return true

};
console.log(oneEditAway('pale', 'ple'), oneEditAway('pales', 'pal')) // true false;