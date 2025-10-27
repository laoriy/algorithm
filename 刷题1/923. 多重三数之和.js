/**
 * 给定一个整数数组 arr ，以及一个整数 target 作为目标值，返回满足 i < j < k 且 arr[i] + arr[j] + arr[k] == target 的元组 i, j, k 的数量。

由于结果会非常大，请返回 109 + 7 的模。

 

示例 1：

输入：arr = [1,1,2,2,3,3,4,4,5,5], target = 8
输出：20
解释：
按值枚举(arr[i], arr[j], arr[k])：
(1, 2, 5) 出现 8 次； 2*2*2三个都不相等
(1, 3, 4) 出现 8 次； 2*2*2三个都不相等
(2, 2, 4) 出现 2 次；
(2, 3, 3) 出现 2 次。
示例 2：

输入：arr = [1,1,2,2,2,2], target = 5
输出：12
解释：
arr[i] = 1, arr[j] = arr[k] = 2 出现 12 次：
我们从 [1,1] 中选择一个 1，有 2 种情况，
从 [2,2,2,2] 中选出两个 2，有 6 种情况。
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var threeSumMulti = function (arr, target) {
    const countArr = new Array(101).fill(0)
    let max = 0, min = 100
    for (const v of arr) {
        if (v > max) max = v
        if (v < min) min = v
        countArr[v] = countArr[v] + 1
    }
    let ans = 0
    const MOD = 1_000_000_007;

    // x !== y !== z
    for (let x = min; x <= max; x++) {
        for (let y = x + 1; y <= max; y++) {
            let z = target - x - y
            if (y < z && z <= max) {
                ans += (countArr[x] * countArr[y] * countArr[z])
                ans %= MOD
            }
        }
    }
    // x === y !== z
    for (let x = min; x <= max; x++) {
        let z = target - x * 2
        if (x < z && z <= max) {
            ans += (countArr[x] * (countArr[x] - 1) / 2 * countArr[z])
            ans %= MOD
        }
    }
    // x !== y === z
    for (let x = min; x <= max; x++) {
        if ((target - x) % 2 === 0) {
            let z = (target - x) / 2
            // 确保z是整数
            if (x < z && z <= max) {
                ans += (countArr[z] * (countArr[z] - 1) / 2 * countArr[x])
                ans %= MOD
            }
        }

    }
    // x === y === z

    if (target % 3 === 0) {
        let x = target / 3
        if (x <= max && x >= 0) {
            ans += (countArr[x] * (countArr[x] - 1) * (countArr[x] - 2) / 6)
            ans %= MOD
        }
    }

    return ans

};

console.log(threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8))
console.log(threeSumMulti([1, 1, 2, 2, 2, 2], 5))