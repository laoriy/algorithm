/**
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

 

示例 1：

输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
示例 2：

输入：triangle = [[-10]]
输出：-10
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    for (let i = 1; i < triangle.length; i++) { // 第i层，从第二层开始
        const row = triangle[i]
        const preSum = triangle[i - 1] // 上一层每个位置的最小路径和
        for (let j = 0; j < row.length; j++) {  // 第i+1层的第j个元素
            const curVal = row[j]
            // 第i层的第j个元素的最小路径和是：第i层的第j个元素 + 第i-1层的第j和j-1个元素中较小的那个
            // 原地保存路径和
            if (j === 0) triangle[i][j] = triangle[i - 1][j] + curVal
            else if (j === row.length - 1) triangle[i][j] = triangle[i - 1][j - 1] + curVal
            else triangle[i][j] = Math.min(preSum[j], preSum[j - 1]) +curVal
        }
    }
    return Math.min(...triangle[triangle.length - 1])
};

var minimumTotal = function (triangle) {
    const n = triangle.length
    for (let i = n - 2; i >= 0; i--) { // 从倒数第二行开始往上遍历
        for (let j = 0; j < triangle[i].length; j++) { // 遍历当前行
            triangle[i][j] = triangle[i][j] + Math.min(triangle[i + 1][j], triangle[i + 1][j + 1])
        }
    }
    return triangle[0][0]
}

// 综上，从下至上会简单很多

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]));
console.log(minimumTotal([[-10]]));
console.log(minimumTotal([[-1], [2, 3], [1, -1, -3]]));
