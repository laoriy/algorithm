/**
 * 给你一个字符串数组 nums ，该数组由 n 个 互不相同 的二进制字符串组成，且每个字符串长度都是 n 。请你找出并返回一个长度为 n 且 没有出现 在 nums 中的二进制字符串。如果存在多种答案，只需返回 任意一个 即可。

 

示例 1：

输入：nums = ["01","10"] // 01 10 11
输出："11"
解释："11" 没有出现在 nums 中。"00" 也是正确答案。
示例 2：

输入：nums = ["00","01"]
输出："11"
解释："11" 没有出现在 nums 中。"10" 也是正确答案。
示例 3：

输入：nums = ["111","011","001"] 111 110 101 100 011 010 001 000
输出："101"
解释："101" 没有出现在 nums 中。"000"、"010"、"100"、"110" 也是正确答案。
 */

/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function (nums) {
    let n = nums.length;
    // const set = new Set()
    // for (let i = 0; i < n; i++) {
    //     set.add(parseInt(nums[i], 2))
    // }

    // for (let i = 0; i <= n; i++) {
    //     if (!set.has(i)) return i.toString(2).padStart(n, 0)
    // }
    // 方法二：每个值的第i位直接取反组成一个新的值，必然和每个数值都不一样
    let ans = ''
    for (let i = 0; i < n; i++) {
        ans += (nums[i][i] === '1' ? '0' : '1')
    }
    return ans
};

console.log(findDifferentBinaryString(["01", "10"]))
console.log(findDifferentBinaryString(["00", "01"]))
console.log(findDifferentBinaryString(["111", "011", "001"]))