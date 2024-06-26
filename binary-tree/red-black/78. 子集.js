/* 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的
子集
（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
示例 2：

输入：nums = [0]
输出：[[],[0]] */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var subsets = function (nums) {
    const result = [[]]

    for (let i = 0; i < nums.length; i++) {
        const length = result.length
        for (let j = 0; j < length; j++) { // 把已经在数组中的每个元素都加上当前的元素 ，形成新的数组
            result.push([...result[j], nums[i]])
        }
    }
    return result
};

// 下面是递归写法
var subsets = function (nums) {
    const result = [[]]
    const temp = []
    function dfs(n) {
        for (let i = n; i < nums.length; i++) {
            temp.push(nums[i])
            result.push([...temp])
            dfs(i + 1)
            temp.pop()
        }
    }
    dfs(0)
    return result
}

console.log(subsets([1, 2, 3]))