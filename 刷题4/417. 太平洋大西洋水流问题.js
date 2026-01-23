/**
 * 有一个 m × n 的矩形岛屿，与 太平洋 和 大西洋 相邻。 “太平洋” 处于大陆的左边界和上边界，而 “大西洋” 处于大陆的右边界和下边界。

这个岛被分割成一个由若干方形单元格组成的网格。给定一个 m x n 的整数矩阵 heights ， heights[r][c] 表示坐标 (r, c) 上单元格 高于海平面的高度 。

岛上雨水较多，如果相邻单元格的高度 小于或等于 当前单元格的高度，雨水可以直接向北、南、东、西流向相邻单元格。水可以从海洋附近的任何单元格流入海洋。

返回网格坐标 result 的 2D 列表 ，其中 result[i] = [ri, ci] 表示雨水从单元格 (ri, ci) 流动 既可流向太平洋也可流向大西洋 。

示例 1：



输入: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
输出: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
示例 2：

输入: heights = [[2,1],[1,2]]
输出: [[0,0],[0,1],[1,0],[1,1]]
 

提示：

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
 */

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function (heights) {
    const m = heights.length, n = heights[0].length;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const canFromTaiPingYang = new Array(m).fill(0).map(() => new Array(n).fill(0)) // 可以从太平洋到达的格子
    const canFromDaXiYang = new Array(m).fill(0).map(() => new Array(n).fill(0)) // 可以从大西洋到达的格子

    function check(start, ocean) {
        start.forEach(([x, y]) => ocean[x][y] = 1)
        while (start.length) {
            const [_x, _y] = start.shift()
            for (dir of dirs) {
                const [__x, __y] = dir
                const x = _x + __x, y = _y + __y;
                if (x >= 0 && x < m && y >= 0 && y < n && !ocean[x][y] && heights[_x][_y] <= heights[x][y]) {
                    start.push([x, y])
                    ocean[x][y] = 1
                }
            }
        }
    }

    const fromTaiPingYangStart = heights.map((_, i) => [i, 0]).concat(heights[0].map((_, i) => [0, i]))
    const fromDaXiYangStart = heights.map((_, i) => [i, n - 1]).concat(heights[0].map((_, i) => [m - 1, i]))
    console.log(fromTaiPingYangStart, fromDaXiYangStart)
    check(fromTaiPingYangStart, canFromTaiPingYang)
    check(fromDaXiYangStart, canFromDaXiYang)

    const ans = []
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (canFromTaiPingYang[i][j] && canFromDaXiYang[i][j]) ans.push([i, j])
        }
    }
    return ans

};

// console.log(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]))
// console.log(pacificAtlantic([[2,1],[1,2]]))
console.log(pacificAtlantic([[5, 5, 5, 5], [4, 4, 4, 4], [5, 5, 5, 5]]))

