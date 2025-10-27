/**
 * 给你一个大小为 m x n 的整数矩阵 mat 和一个整数 target 。

从矩阵的 每一行 中选择一个整数，你的目标是 最小化 所有选中元素之 和 与目标值 target 的 绝对差 。

返回 最小的绝对差 。

a 和 b 两数字的 绝对差 是 a - b 的绝对值。

 

示例 1：




输入：mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13

输出：0
解释：一种可能的最优选择方案是：
- 第一行选出 1
- 第二行选出 5
- 第三行选出 7
所选元素的和是 13 ，等于目标值，所以绝对差是 0 。
示例 2：



输入：mat = [[1],[2],[3]], target = 100
输出：94
解释：唯一一种选择方案是：
- 第一行选出 1
- 第二行选出 2
- 第三行选出 3
所选元素的和是 6 ，绝对差是 94 。
示例 3：



输入：mat = [[1,2,9,8,7]], target = 6
输出：1
解释：最优的选择方案是选出第一行的 7 。
绝对差是 1 。
 

提示：

m == mat.length
n == mat[i].length
1 <= m, n <= 70
1 <= mat[i][j] <= 70
1 <= target <= 800
 */

/**
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
var minimizeTheDifference = function (mat, target) {
    let sum = new Set(mat[0])
    let nLen = mat[0].length
    for (let m = 1; m < mat.length; m++) {
        const newSums = new Set();
        for (let n = 0; n < nLen; n++) {
            for (const s of sum) {
                const newSum = s + mat[m][n]
                newSums.add(newSum)
            }
        }
        sum = newSums
    }
    let ans = Infinity
    sum.forEach(s => {
        ans = Math.min(ans, Math.abs(s - target))
    })
    return ans
};

console.log(minimizeTheDifference([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 13))
console.log(minimizeTheDifference([[1], [2], [3]], 100))
console.log(minimizeTheDifference([[1, 2, 9, 8, 7]], 6))
console.log(minimizeTheDifference([[65], [45], [45], [69], [55], [60], [29], [25], [16], [5], [62], [16], [29], [19], [34], [2], [24], [32], [66], [62], [60], [46], [42], [37], [51], [4], [41], [4], [66], [20], [9], [4], [66], [6], [56], [10], [51], [44], [7], [8], [5], [44], [28], [7], [10], [7], [24], [62], [19], [14], [45], [68], [9], [14], [51], [28], [8], [57], [59], [6], [54], [8], [19], [16], [63], [45], [33], [15], [33], [67]], 800))