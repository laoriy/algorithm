/**
 * 两个整数之间的 汉明距离 指的是这两个数字对应二进制位不同的位置的数目。

给你两个整数 x 和 y，计算并返回它们之间的汉明距离。

 

示例 1：

输入：x = 1, y = 4
输出：2
解释：
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
上面的箭头指出了对应二进制位不同的位置。
示例 2：

输入：x = 3, y = 1
输出：1
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
    let v = x ^ y // 异或后数字不同的位置为1，相同的为0
    //然后，计结果中等于 1 的位数。
    let count = 0

    while (v) {
        // 方法一：每次右移一位，判断最后一位是否为1
        count += v & 1
        v = v >> 1
        // 方法二：Brian Kernighan 算法
        // v = v & (v - 1)
        // count++
    }

    return count
};