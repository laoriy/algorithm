/**
 * 给你两个字符串 s 和 t ，请你通过若干次以下操作将字符串 s 转化成字符串 t ：

选择 s 中一个 非空 子字符串并将它包含的字符就地 升序 排序。
比方说，对下划线所示的子字符串进行操作可以由 "14234" 得到 "12344" 。

如果可以将字符串 s 变成 t ，返回 true 。否则，返回 false 。

一个 子字符串 定义为一个字符串中连续的若干字符。

示例 1：

输入：s = "84532", t = "34852"
输出：true
解释：你可以按以下操作将 s 转变为 t ：
"84532" （从下标 2 到下标 3）-> "84352"
"84352" （从下标 0 到下标 2） -> "34852"
示例 2：

输入：s = "34521", t = "23415"
输出：true
解释：你可以按以下操作将 s 转变为 t ：
"34521" -> "23451"
"23451" -> "23415"
示例 3：

输入：s = "12345", t = "12435"
输出：false
示例 4：

输入：s = "1", t = "2"
输出：false
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isTransformable = function (s, t) {
    const posArr = new Array(10).fill(null).map(() => ([])) // 存储每个数字的位置
    for (let i = 0; i < s.length; i++) {
        posArr[s[i]].push(i)
    }

    for (let i = 0; i < t.length; i++) {
        const char = t[i]
        if (posArr[char].length === 0) return false // 这个数字直接在s中不存在
        for (let j = 0; j < char; j++) {
            if (posArr[j].length && posArr[j][0] < posArr[char][0]) return false // 在这个之前有比它还小的数字
        }
        posArr[char].shift()
    }
    return true
};

console.log(isTransformable('84532', '34852'))
console.log(isTransformable('34521', '23415'))
console.log(isTransformable('12345', '12435'))
console.log(isTransformable('1', '2'))