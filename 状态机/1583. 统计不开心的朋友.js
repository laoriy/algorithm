/**
 * 给你一份 n 位朋友的亲近程度列表，其中 n 总是 偶数 。

对每位朋友 i，preferences[i] 包含一份 按亲近程度从高到低排列 的朋友列表。换句话说，排在列表前面的朋友与 i 的亲近程度比排在列表后面的朋友更高。每个列表中的朋友均以 0 到 n-1 之间的整数表示。

所有的朋友被分成几对，配对情况以列表 pairs 给出，其中 pairs[i] = [xi, yi] 表示 xi 与 yi 配对，且 yi 与 xi 配对。

但是，这样的配对情况可能会使其中部分朋友感到不开心。在 x 与 y 配对且 u 与 v 配对的情况下，如果同时满足下述两个条件，x 就会不开心：

x 与 u 的亲近程度胜过 x 与 y，且
u 与 x 的亲近程度胜过 u 与 v
返回 不开心的朋友的数目 。

 

示例 1：

输入：n = 4, preferences = [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], pairs = [[0, 1], [2, 3]]
输出：2
解释：
朋友 1 不开心，因为：
- 1 与 0 配对，但 1 与 3 的亲近程度比 1 与 0 高，且
- 3 与 1 的亲近程度比 3 与 2 高。
朋友 3 不开心，因为：
- 3 与 2 配对，但 3 与 1 的亲近程度比 3 与 2 高，且
- 1 与 3 的亲近程度比 1 与 0 高。
朋友 0 和 2 都是开心的。
示例 2：

输入：n = 2, preferences = [[1], [0]], pairs = [[1, 0]]
输出：0
解释：朋友 0 和 1 都开心。
示例 3：

输入：n = 4, preferences = [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], pairs = [[1, 3], [0, 2]]
输出：4
 */
/**
 * @param {number} n
 * @param {number[][]} preferences
 * @param {number[][]} pairs
 * @return {number}
 */
var unhappyFriends = function (n, preferences, pairs) {
    const g = [] // 对于第i个人，与他亲近的人j = preferences[i][j] 所处的下标

    for (let i = 0; i < n; i++) {
        g[i] = []
        for (let j = 0; j < n - 1; j++) {
            g[i][preferences[i][j]] = j
        }
    }

    const matches = [] // 每个相互配对的人，matches[i] 为 与i 配对的人
    for (const pair of pairs) {
        const [one, two] = pair
        matches[one] = two
        matches[two] = one
    }
    let result = 0

    for (let x = 0; x < n; x++) {
        const match = matches[x] // 与x亲近的人
        const yIndex = g[x][match] // 与x亲近的此人y在x所亲近的人里面的下标
        // 在index之前的人都可以是u，进行枚举判断: 这里就满足了第一个条件 x与u 的亲近程度超过 x与y
        for (let j = 0; j < yIndex; j++) {
            const u = preferences[x][j]
            const v = matches[u]
            if (g[u][v] > g[u][x]) { // 满足第二个条件，u与x 的亲近程度超过 u与v（g[u][x]下标更小，亲近程度更高）
                result++
                break;
            }
        }

    }

    return result
};

console.log(unhappyFriends(4, [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], [[0, 1], [2, 3]]))
console.log(unhappyFriends(2, [[1], [0]], [[1, 0]]))
console.log(unhappyFriends(4, [[1, 3, 2], [2, 3, 0], [1, 3, 0], [0, 2, 1]], [[1, 3], [0, 2]]))