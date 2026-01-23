/**
 * 
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

值 0 代表空单元格；
值 1 代表新鲜橘子；
值 2 代表腐烂的橘子。
每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。

 

示例 1：

./images994.png

输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4
示例 2：

输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
示例 3：

输入：grid = [[0,2]]
输出：0
解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 10
grid[i][j] 仅为 0、1 或 2
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting1 = function (grid) {
    let fresh = 0
    const bad = new Set()
    const rowLen = grid.length;
    const colLen = grid[0].length

    for (let i = 0; i < rowLen; i += 1) {
        const row = grid[i]
        for (let j = 0; j < colLen; j += 1) {
            const orange = row[j]
            if (orange === 1) fresh += 1
            if (orange === 2) bad.add(`${i}${j}`)
        }
    }

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    function rot(oldBad, minutes) {
        if (!oldBad.size) return minutes
        const newBad = new Set()
        // console.log(oldBad)
        oldBad.forEach(badItem => {
            for (direction of directions) {
                const [_x, _y] = badItem.split('')
                const [__x, __y] = direction
                let x = +_x + __x, y = +_y + __y
                const key = `${x}${y}`
                if (x >= 0 && x < rowLen && y >= 0 && y < colLen && !bad.has(key) && grid[x][y] === 1) {
                    bad.add(key)
                    newBad.add(key)
                    fresh--
                }
            }
        });
        return rot(newBad, minutes + 1)
    }
    const minutes = rot(new Set(bad), 0)
    return fresh > 0 ? -1 : minutes ? minutes - 1 : minutes

};

var orangesRotting = function (grid) {
    let fresh = 0
    const bad = []
    const rowLen = grid.length;
    const colLen = grid[0].length
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    let ans = 0

    for (let i = 0; i < rowLen; i += 1) {
        const row = grid[i]
        for (let j = 0; j < colLen; j += 1) {
            const orange = row[j]
            if (orange === 1) fresh += 1
            if (orange === 2) bad.push([i, j, 0])
        }
    }

    while (bad.length) {
        const [_x, _y, time] = bad.shift()
        ans = time
        for (direction of directions) {
            const [__x, __y] = direction
            let x = +_x + __x, y = +_y + __y
            if (x >= 0 && x < rowLen && y >= 0 && y < colLen && grid[x][y] === 1) {
                bad.push([x, y, time + 1])
                grid[x][y] = 2
                fresh--
            }
        }
    }
    return fresh > 0 ? -1 : ans
};

console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))
console.log(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))
console.log(orangesRotting([[0, 2]]))
console.log(orangesRotting([[0]]))
console.log(orangesRotting([[1]]))
