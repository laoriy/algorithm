function makesquare(matchsticks) {
    const sum = matchsticks.reduce((acc, cur) => acc + cur, 0)
    if (sum % 4 !== 0) return false
    matchsticks.sort((a, b) => b - a)
    const target = sum / 4
    const buckets = [0, 0, 0, 0]

    function dfs(index) {
        if (index === matchsticks.length) {
            return true
        }
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] += matchsticks[index]
            if (buckets[i] <= target && dfs(index + 1)) {
                return true
            }
            buckets[i] -= matchsticks[index]

        }
        return false
    }
    return dfs(0)
};

console.log(makesquare([3, 3, 3, 3, 4]));
// console.log(makesquare([1, 1, 2, 2, 2]));