/* 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

 

示例 1：

输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
示例 2：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] */


/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
    const result = []
    const used = []
    function dfs(path) {
        if (path.length === nums.length) {
            result.push([...path])
            return
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) continue
            path.push(nums[i])
            used[i] = true
            dfs(path)
            path.pop()
            used[i] = false
        }
    }
    nums.sort((a, b) => a - b)
    dfs([])
    return result
};

console.log(permuteUnique([1, 1, 2]));