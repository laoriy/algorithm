/**
 * 给你一个下标从 0 开始、由 n 个整数组成的数组 arr 。

arr 中两个元素的 间隔 定义为它们下标之间的 绝对差 。更正式地，arr[i] 和 arr[j] 之间的间隔是 |i - j| 。

返回一个长度为 n 的数组 intervals ，其中 intervals[i] 是 arr[i] 和 arr 中每个相同元素（与 arr[i] 的值相同）的 间隔之和 。

注意：|x| 是 x 的绝对值。

 

示例 1：

输入：arr = [2,1,3,1,2,3,3]
输出：[4,2,7,2,4,4,5]
解释：
- 下标 0 ：另一个 2 在下标 4 ，|0 - 4| = 4
- 下标 1 ：另一个 1 在下标 3 ，|1 - 3| = 2
- 下标 2 ：另两个 3 在下标 5 和 6 ，|2 - 5| + |2 - 6| = 7
- 下标 3 ：另一个 1 在下标 1 ，|3 - 1| = 2
- 下标 4 ：另一个 2 在下标 0 ，|4 - 0| = 4
- 下标 5 ：另两个 3 在下标 2 和 6 ，|5 - 2| + |5 - 6| = 4
- 下标 6 ：另两个 3 在下标 2 和 5 ，|6 - 2| + |6 - 5| = 5
示例 2：

输入：arr = [10,5,10,10]
输出：[5,0,3,4]
解释：
- 下标 0 ：另两个 10 在下标 2 和 3 ，|0 - 2| + |0 - 3| = 5
- 下标 1 ：只有这一个 5 在数组中，所以到相同元素的间隔之和是 0
- 下标 2 ：另两个 10 在下标 0 和 3 ，|2 - 0| + |2 - 3| = 3
- 下标 3 ：另两个 10 在下标 0 和 2 ，|3 - 0| + |3 - 2| = 4
 */

/**
 * @param {number[]} arr
 * @return {number[]}
 */
var getDistances = function (arr) {
    const map = new Map()
    let result = new Array(arr.length).fill(0)
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        if (map.has(v)) {
            const old = map.get(v)
            old.forEach(indexV => {
                const diff = (Math.abs(i - indexV))
                result[indexV] += diff
                result[i] += diff
            });
            map.set(v, old.concat(i))
        } else {
            map.set(v, [i])
        }
    }
    return result
};
// 以上方法会超时

var getDistances = function (arr) {
    // 一个数左侧： 左侧出现次数 * 当前下标 - 左侧下标和 
    // 一个数右侧： 右侧下标和 - 右侧侧出现次数 * 当前下标
    const result = []
    const map = new Map()
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        if (map.has(v)) { // 有这个值
            const [count, sum] = map.get(v)
            map.set(v, [count + 1, sum + i])
        } else {
            map.set(v, [1, i])
        }
        const [count, sum] = map.get(v)
        result[i] = count * i - sum
    }
    map.clear()
    for (let i = arr.length - 1; i >= 0; i--) {
        const v = arr[i]
        if (map.has(v)) { // 有这个值
            const [count, sum] = map.get(v)
            map.set(v, [count + 1, sum + i])
        } else {
            map.set(v, [1, i])
        }
        const [count, sum] = map.get(v)
        result[i] += sum - count * i
    }
    return result
};

console.log(getDistances([2, 1, 3, 1, 2, 3, 3]))
console.log(getDistances([10, 5, 10, 10]))


