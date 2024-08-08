/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
示例 1：

输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2：

输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 
 
 */

/**
* @param {number[]} nums
* @return {number}
*/
var rob = function (nums) {
    if (!nums || nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    const dp = new Array(nums.length) // 偷每个房子的最大价值
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]) // 偷当前房子 和 不偷当前房子的最大价值
    }
    return dp[nums.length - 1]
};

// 使用滚动数组
var rob = function (nums) {
    if (!nums || nums.length === 0) return 0
    if (nums.length === 1) return nums[0]
    // 每个时刻只需要存储前两间房屋的最高总金额。
    let first = nums[0]
    let second = Math.max(nums[0], nums[1])
    for (let i = 2; i < nums.length; i++) {
        const temp = second
        second = Math.max(nums[i] + first, second)
        first = temp
    }
    return second
};


