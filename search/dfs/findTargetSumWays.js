/**
 * 494. 目标和
 * @param {number[]} nums 
 * @param {number} target
 * @return {number} 
 */
function findTargetSumWays(nums, target) {
    let count = 0;

    function dfs(i, sum) {
        if (i === nums.length) {
            if (sum === target) count++
            return
        }
        dfs(i + 1, sum + nums[i])
        dfs(i + 1, sum - nums[i])
    }

    dfs(0, 0)


    return count
};

function findTargetSumWaysMemory(nums, target) {

    const indexToTargetMap = new Map()
    function dfs(i, _target) {
        if (i === nums.length) {
            return _target === 0 ? 1 : 0
        }
        if (indexToTargetMap.has(`${i}_${_target}`)) {
            return indexToTargetMap.get(`${i}_${_target}`)
        }
        let count = 0;

        count += dfs(i + 1, _target - nums[i])
        count += dfs(i + 1, _target + nums[i])

        indexToTargetMap.set(`${i}_${_target}`, count)
        return count;
    }

    return dfs(0, target)
};

console.log(
    findTargetSumWays([1, 1, 1, 1, 1], 3),
    findTargetSumWays([1], 1),
    '--- memory -->',
    findTargetSumWaysMemory([1, 1, 1, 1, 1], 3),
    findTargetSumWaysMemory([1], 1)
)
