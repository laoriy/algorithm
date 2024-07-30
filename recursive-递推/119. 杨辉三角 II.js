/**
 * 
 * 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

    在「杨辉三角」中，每个数是它左上方和右上方的数的和。


示例 1:

输入: rowIndex = 3
输出: [1,3,3,1]
示例 2:

输入: rowIndex = 0
输出: [1]
示例 3:

输入: rowIndex = 1
输出: [1,1]
 */

// 因为下一行只和上一行有关，所以可以用滚动数组的方法

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
    let ans = []
    for (let i = 0; i <= rowIndex; i++) {
        if (!ans[i]) ans[i] = []
        ans[i][0] = 1
        ans[i][i] = 1

        for (let j = 1; j < i; j++) {
            ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j]
        }
    }
    return ans[rowIndex]
};

var getRow = function (rowIndex) {
    let pre = [],cur = []
    for (let i = 0; i <= rowIndex; i++) {
        cur = []
        cur[0] = cur[i] = 1
        for (let j = 1; j < i; j++) {
            cur[j] = pre[j - 1] + pre[j]
        }
        pre = cur
    }
    return cur
};

console.log(
    getRow(3),
    getRow(0),
    getRow(1),
)