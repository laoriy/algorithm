/**
 * 
 * 给你一个整数数组 arr 和一个整数值 target 。

请你在 arr 中找 两个互不重叠的子数组 且它们的和都等于 target 。可能会有多种方案，请你返回满足要求的两个子数组长度和的 最小值 。

请返回满足要求的最小长度和，如果无法找到这样的两个子数组，请返回 -1 。

 

示例 1：

输入：arr = [3,2,2,4,3], target = 3
输出：2
解释：只有两个子数组和为 3 （[3] 和 [3]）。它们的长度和为 2 。
示例 2：

输入：arr = [7,3,4,7], target = 7
输出：2
解释：尽管我们有 3 个互不重叠的子数组和为 7 （[7], [3,4] 和 [7]），但我们会选择第一个和第三个子数组，因为它们的长度和 2 是最小值。
示例 3：

输入：arr = [4,3,2,6,2,3,4], target = 6
输出：-1
解释：我们只有一个和为 6 的子数组。
示例 4：

输入：arr = [5,5,4,4,5], target = 3
输出：-1
解释：我们无法找到和为 3 的子数组。
示例 5：

输入：arr = [3,1,1,1,5,1,2,1], target = 3
输出：3
解释：注意子数组 [1,2] 和 [2,1] 不能成为一个方案因为它们重叠了。
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
/**
 * Returns the minimum sum of lengths of two non-overlapping subarrays 
 * in the given array that sum up to the target value.
 * 
 * @param {number[]} arr - The input array of numbers.
 * @param {number} target - The target sum value.
 * @returns {number} The minimum sum of lengths of two non-overlapping subarrays, or -1 if no such subarrays exist.
 */
var minSumOfLengths = function (arr, target) {
    const effectArr = [];
    let sum = 0;
    let l = 0;
    for (let r = 0; r < arr.length; r++) {
        sum += arr[r];
        while (sum > target) {
            sum -= arr[l];
            l++;
        }
        if (sum === target) {
            effectArr.push([l, r]);
        }
    }

    if (effectArr.length < 2) return -1
    // 这里是动态规划
    let preIndex = -1;// 和当前位置不相交的最后一个位置
    let preMinLen = arr.length + 1;// 和当前位置不相交的最小长度
    let ans = -1;
    for (x of effectArr) {
        const [curLeft, curRight] = x;
        while (effectArr[preIndex + 1]?.[1] < curLeft) { // 找到和当前位置不相交的最后一个位置
            preIndex++;
            preMinLen = Math.min(preMinLen, effectArr[preIndex][1] - effectArr[preIndex][0] + 1);
        }
        if (preIndex == -1) continue;
        if (ans == -1 || ans > preMinLen + curRight - curLeft + 1) {
            ans = preMinLen + curRight - curLeft + 1;
        }
    }
    return ans;
};

console.log(minSumOfLengths([3, 2, 2, 4, 3], 3))
console.log(minSumOfLengths([7, 3, 4, 7], 7))
console.log(minSumOfLengths([4, 3, 2, 6, 2, 3, 4], 6))
console.log(minSumOfLengths([5, 5, 4, 4, 5], 3))
console.log(minSumOfLengths([3, 1, 1, 1, 5, 1, 2, 1], 3))
console.log(minSumOfLengths([1, 6, 1], 7))