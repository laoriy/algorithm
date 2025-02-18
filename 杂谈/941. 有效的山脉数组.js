/**
 * 给定一个整数数组 arr，如果它是有效的山脉数组就返回 true，否则返回 false。

让我们回顾一下，如果 arr 满足下述条件，那么它是一个山脉数组：

arr.length >= 3
在 0 < i < arr.length - 1 条件下，存在 i 使得：
arr[0] < arr[1] < ... arr[i-1] < arr[i] 
arr[i] > arr[i+1] > ... > arr[arr.length - 1]

示例 1：

输入：arr = [2,1]
输出：false
示例 2：

输入：arr = [3,5,5]
输出：false
示例 3：

输入：arr = [0,3,2,1]
输出：true
 */

/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
    let hasUp = false;
    let hasDown = false;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) return false;
        if (arr[i] > arr[i - 1]) {
            if (hasDown) return false; // 如果之前有下坡
            hasUp = true
        }
        if (arr[i] < arr[i - 1]) {
            if (!hasUp) return false // 如果之前没有上坡
            hasDown = true
        }
    }
    return hasUp && hasDown
};

console.log(validMountainArray([2, 1])); // false
console.log(validMountainArray([3, 5, 5])); // false
console.log(validMountainArray([0, 3, 2, 1])); // true
console.log(validMountainArray([0, 1, 2, 4, 2, 1])) // true

