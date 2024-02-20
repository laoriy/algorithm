/**
 * 39. 组合总和
 */

function combinationSum(candidates, target) {
    let result = []
    candidates.sort((a, b) => a - b)
    // begin 参数取决于是否将顺序不同的情况考虑进来
    // 用map结构也能实现
    // 
    function dfs(target, _path, begin) {
        for (let i = begin; i < candidates.length; i++) {
            let path = _path.concat(candidates[i])
            let value = target - candidates[i]
            if (value < 0) continue
            if (value === 0) {
                result.push(path)
                continue
            }
            // 剪枝，减少不必要的递归

            dfs(value, path, i)
        }
    }
    dfs(target, [], 0)
    return result
};


console.log(
    combinationSum([2, 3, 6, 7], 7),
    combinationSum([2, 3, 5], 8),
    combinationSum([2], 1)
)