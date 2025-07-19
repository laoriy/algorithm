/**
 * 给你一个数组 arr ，该数组表示一个从 1 到 n 的数字排列。有一个长度为 n 的二进制字符串，该字符串上的所有位最初都设置为 0 。

在从 1 到 n 的每个步骤 i 中（假设二进制字符串和 arr 都是从 1 开始索引的情况下），二进制字符串上位于位置 arr[i] 的位将会设为 1 。

给你一个整数 m ，请你找出二进制字符串上存在长度为 m 的一组 1 的最后步骤。一组 1 是一个连续的、由 1 组成的子串，且左右两边不再有可以延伸的 1 。

返回存在长度 恰好 为 m 的 一组 1  的最后步骤。如果不存在这样的步骤，请返回 -1 。

 

示例 1：

输入：arr = [3,5,1,2,4], m = 1
输出：4
解释：
步骤 1："00100"，由 1 构成的组：["1"]
步骤 2："00101"，由 1 构成的组：["1", "1"]
步骤 3："10101"，由 1 构成的组：["1", "1", "1"]
步骤 4："11101"，由 1 构成的组：["111", "1"]
步骤 5："11111"，由 1 构成的组：["11111"]
存在长度为 1 的一组 1 的最后步骤是步骤 4 。
示例 2：

输入：arr = [3,1,5,4,2], m = 2
输出：-1
解释：
步骤 1："00100"，由 1 构成的组：["1"]
步骤 2："10100"，由 1 构成的组：["1", "1"]
步骤 3："10101"，由 1 构成的组：["1", "1", "1"]
步骤 4："10111"，由 1 构成的组：["1", "111"]
步骤 5："11111"，由 1 构成的组：["11111"]
不管是哪一步骤都无法形成长度为 2 的一组 1 。
示例 3：

输入：arr = [1], m = 1
输出：1
示例 4：

输入：arr = [2,1], m = 2
输出：2
 */
/**
 * @param {number[]} arr
 * @param {number} m
 * @return {number}
 */
var findLatestStep = function (arr, m) {
    const map = new Map() // 记录arr每个位置所在的1的区间。
    let ans = -1
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        let left = map.get(arr[i] - 1);
        let right = map.get(arr[i] + 1);
        if (left && right) {
            // 左右两边都有1，
            const [leftStart, leftEnd] = left
            const [rightStart, rightEnd] = right
            map.delete(rightStart)
            map.delete(leftEnd)
            if (leftEnd - leftStart + 1 === m) count--
            if (rightEnd - rightStart + 1 === m) count--
            map.set(leftStart, [leftStart, rightEnd])
            map.set(rightEnd, [leftStart, rightEnd])
            if (rightEnd - leftStart + 1 === m) count++
        } else if (left) {
            // 左边是1
            const [leftStart, leftEnd] = left
            map.delete(leftEnd)
            if (leftEnd - leftStart + 1 === m) count--
            map.set(leftStart, [leftStart, arr[i]])
            map.set(arr[i], [leftStart, arr[i]])
            if (arr[i] - leftStart + 1 === m) count++
        } else if (right) {
            // 右边是1
            const [rightStart, rightEnd] = right
            map.delete(rightStart)
            if (rightEnd - rightStart + 1 === m) count--
            map.set(rightEnd, [arr[i], rightEnd])
            map.set(arr[i], [arr[i], rightEnd])
            if (rightEnd - arr[i] + 1 === m) count++
        } else {
            // 左右都是0
            map.set(arr[i], [arr[i], arr[i]])
            if (m === 1) count++
        }
        if (count > 0) ans = i + 1
    }
    return ans
};

console.log(findLatestStep([3, 5, 1, 2, 4], 1))
console.log(findLatestStep([3, 1, 5, 4, 2], 2))
console.log(findLatestStep([1], 1))
console.log(findLatestStep([2, 1], 2))