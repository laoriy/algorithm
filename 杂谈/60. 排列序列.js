/**
 * 给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。

按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

"123"
"132"
"213"
"231"
"312"
"321"
给定 n 和 k，返回第 k 个排列。

 

示例 1：

输入：n = 3, k = 3
输出："213"
示例 2：

输入：n = 4, k = 9
输出："2314"
示例 3：

输入：n = 3, k = 1
输出："123"
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function (n, k) {
    const ans = []

    const dfs = (i) => {
        if (i.length === n) {
            ans.push([...i])
            return
        }
        for (let j = 0; j < n; j++) {
            if (i.includes(j + 1)) continue
            i.push(j + 1)
            dfs(i)
            i.pop()
        }

    }
    dfs([])
    return ans[k - 1].join('')

};
// 以上方法会超出时间限制



console.log(getPermutation(3, 3)); // 213
console.log(getPermutation(4, 9)); // 2314
console.log(getPermutation(3, 1)); // 123