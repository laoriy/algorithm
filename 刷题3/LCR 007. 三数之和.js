/**
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a ，b ，c ，使得 a + b + c = 0 ？请找出所有和为 0 且 不重复 的三元组。

 

示例 1：

输入：nums = [-1,0,1,2,-1,-4] // -4,-1,-1,0,1,2
输出：[[-1,-1,2],[-1,0,1]]
示例 2：

输入：nums = []
输出：[]
示例 3：

输入：nums = [0]
输出：[]
 

提示：

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum1 = function (nums) {

    nums = nums.sort((a, b) => a - b)
    const ans = []
    const set = new Set()
    // for 循环里面进行双指针,记得去重
    for (let i = 0; i < nums.length; i++) {
        const num = -nums[i]
        let left = i + 1; right = nums.length - 1;
        while (left < right) {
            const sum = nums[left] + nums[right]
            if (sum === num) {
                const res = [nums[i], nums[left], nums[right]]
                if (!set.has(res.join(''))) {
                    ans.push(res)
                    set.add(res.join(''))
                }
            }
            if (sum > num) {
                right--
            } else {
                left++
            }
        }

    }
    console.log(ans)



};

var threeSum = function (nums) {

    nums = nums.sort((a, b) => a - b)
    const ans = []
    // for 循环里面进行双指针,记得去重
    for (let i = 0; i < nums.length; i++) {
        if (i && nums[i] === nums[i - 1]) continue;
        const num = -nums[i]
        let left = i + 1; right = nums.length - 1;
        while (left < right) {
            const sum = nums[left] + nums[right]
            if (sum === num && !(left - 1 > i && nums[left] === nums[left - 1])) {
                const res = [nums[i], nums[left], nums[right]]
                ans.push(res)
            }
            if (sum > num) {
                right--
            } else {
                left++
            }
        }
    }
    return ans
}


console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([0, 0, 0]))