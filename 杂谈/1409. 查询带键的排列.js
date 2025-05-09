/**
 * 给定一个正整数数组 queries ，其取值范围在 1 到 m 之间。 请你根据以下规则按顺序处理所有 queries[i]（从 i=0 到 i=queries.length-1）：

首先，你有一个排列 P=[1,2,3,...,m]。
对于当前的 i ，找到 queries[i] 在排列 P 中的位置（从 0 开始索引），然后将它移到排列 P 的开头（即下标为 0 处）。注意， queries[i] 的查询结果是 queries[i] 在 P 中移动前的位置。
返回一个数组，包含从给定  queries 中查询到的结果。

 

示例 1：

输入：queries = [3,1,2,1], m = 5
输出：[2,1,2,1] 
解释：处理 queries 的过程如下：
对于 i=0: queries[i]=3, P=[1,2,3,4,5], 3 在 P 中的位置是 2，然后我们把 3 移动到 P 的开头，得到 P=[3,1,2,4,5] 。
对于 i=1: queries[i]=1, P=[3,1,2,4,5], 1 在 P 中的位置是 1，然后我们把 1 移动到 P 的开头，得到 P=[1,3,2,4,5] 。 
对于 i=2: queries[i]=2, P=[1,3,2,4,5], 2 在 P 中的位置是 2，然后我们把 2 移动到 P 的开头，得到 P=[2,1,3,4,5] 。
对于 i=3: queries[i]=1, P=[2,1,3,4,5], 1 在 P 中的位置是 1，然后我们把 1 移动到 P 的开头，得到 P=[1,2,3,4,5] 。 
因此，包含结果的数组为 [2,1,2,1] 。  
示例 2：

输入：queries = [4,1,2,2], m = 4
输出：[3,1,2,0]
示例 3：

输入：queries = [7,5,5,8,3], m = 8
输出：[6,5,0,7,5]
 */

/**
 * @param {number[]} queries
 * @param {number} m
 * @return {number[]}
 */
var processQueries = function (queries, m) {
    const numArray = new Array(m).fill(0).map((v, i) => i + 1);
    let ans = []
    for (let query of queries) {
        const idx = numArray.indexOf(query)
        const [del] = numArray.splice(idx, 1)
        numArray.unshift(del)
        ans.push(idx)
    }
    return ans
};