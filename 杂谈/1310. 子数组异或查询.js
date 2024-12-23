/**
 * 有一个正整数数组 arr，现给你一个对应的查询数组 queries，其中 queries[i] = [Li, Ri]。

对于每个查询 i，请你计算从 Li 到 Ri 的 XOR 值（即 arr[Li] xor arr[Li+1] xor ... xor arr[Ri]）作为本次查询的结果。

并返回一个包含给定查询 queries 所有结果的数组。

 

示例 1：

输入：arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
输出：[2,7,14,8] 
解释：
数组中元素的二进制表示形式是：
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
查询的 XOR 值为：
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8
示例 2：

输入：arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
输出：[8,0,4,4]
 
 */

// 异或运算的性质：若 a^b = c, 则 a^c = b, b^c = a ，这是因为异或运算是无进位相加，所以可以理解为 a^b = c 是 a+b = c 的一种变形

/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function (arr, queries) {
    const sum = [arr[0]] // 前n项的异或值
    const res = []
    for (let i = 1; i < arr.length; i++) {
        sum[i] = sum[i - 1] ^ arr[i]
    }

    for (let i = 0; i < queries.length; i++) {
        const [start, end] = queries[i]
        res.push(sum[end] ^ (sum[start - 1] || 0))
    }
    return res
};

console.log(xorQueries([1, 3, 4, 8], [[0, 1], [1, 2], [0, 3], [3, 3]])) // [2,7,14,8];
