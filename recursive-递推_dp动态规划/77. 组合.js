/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]
 */


/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    const res = []
    function dfs(val, temp) {

        if (temp.length === k) {
            res.push(temp)
            return
        }
        if (val > n) return

        dfs(val + 1, [...temp, val])
        dfs(val + 1, temp)
    }
    dfs(1, [])
    return res
};

console.log(
    // combine(4, 2),
    // combine(1, 1),
    combine(2, 1)
)
