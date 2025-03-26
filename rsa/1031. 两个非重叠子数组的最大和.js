/**
 * 给你一个整数数组 nums 和两个整数 firstLen 和 secondLen，请你找出并返回两个非重叠 子数组 中元素的最大和，长度分别为 firstLen 和 secondLen 。

长度为 firstLen 的子数组可以出现在长为 secondLen 的子数组之前或之后，但二者必须是不重叠的。

子数组是数组的一个 连续 部分。

 

示例 1：

输入：nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2
输出：20
解释：子数组的一种选择中，[9] 长度为 1，[6,5] 长度为 2。
示例 2：

输入：nums = [3,8,1,3,2,1,8,9,0], firstLen = 3, secondLen = 2
输出：29
解释：子数组的一种选择中，[3,8,1] 长度为 3，[8,9] 长度为 2。
示例 3：

输入：nums = [2,1,5,6,0,9,5,0,3,8], firstLen = 4, secondLen = 3
输出：31
解释：子数组的一种选择中，[5,6,0,9] 长度为 4，[0,3,8] 长度为 3。
 
 */

function getMax(sums, i, j, len) {
    if (j + 1 - i < len) return 0
    // console.log('i:', i, 'j:', j, 'len:', len)

    let ans = sums[j] - (sums[j - len] || 0)
    for (let x = i + len - 1; x <= j; x++) {
        ans = Math.max(ans, sums[x] - (sums[x - len] || 0))
    }
    return ans
}

/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
    const sums = [nums[0]]

    let ans = 0
    for (let i = 1; i < nums.length; i++) {
        sums[i] = sums[i - 1] + nums[i]
    }
    // console.log('sums:', sums)

    for (let i = 0; i < nums.length; i++) {
        let leftMax1 = getMax(sums, 0, i, firstLen)
        let leftMax2 = getMax(sums, 0, i, secondLen)
        let rightMax1 = getMax(sums, i + 1, nums.length - 1, firstLen)
        let rightMax2 = getMax(sums, i + 1, nums.length - 1, secondLen)
        // console.log(i, 'leftMax1:', leftMax1, 'rightMax1:', rightMax1, 'leftMax2:', leftMax2, 'rightMax2:', rightMax2)
        ans = Math.max(ans, leftMax1 + rightMax2, leftMax2 + rightMax1)
    }
    return ans
};

console.log(maxSumTwoNoOverlap([0, 6, 5, 2, 2, 5, 1, 9, 4], 1, 2))
console.log(maxSumTwoNoOverlap([3, 8, 1, 3, 2, 1, 8, 9, 0], 3, 2))
console.log(maxSumTwoNoOverlap([2, 1, 5, 6, 0, 9, 5, 0, 3, 8], 4, 3))
console.log(maxSumTwoNoOverlap([1, 0, 1], 1, 1))
console.log(maxSumTwoNoOverlap([4, 0, 1], 2, 1))
console.log(maxSumTwoNoOverlap([4, 5, 14, 16, 16, 20, 7, 13, 8, 15], 3, 5))
console.log(maxSumTwoNoOverlap([67, 38, 92, 21, 91, 24, 25, 20, 100, 41, 22, 56, 63, 42, 95, 76, 84, 79, 89, 3], 18, 1))



