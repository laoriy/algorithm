/**
 * 你准备参加一场远足活动。给你一个二维 rows x columns 的地图 heights ，其中 heights[row][col] 表示格子 (row, col) 的高度。一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从 0 开始编号）。你每次可以往 上，下，左，右 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。

一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。

请你返回从左上角走到右下角的最小 体力消耗值 。


示例 1：



输入：heights = [[1,2,2],[3,8,2],[5,3,5]]
输出：2
解释：路径 [1,3,5,3,5] 连续格子的差值绝对值最大为 2 。
这条路径比路径 [1,2,2,2,5] 更优，因为另一条路径差值最大值为 3 。
示例 2：



输入：heights = [[1,2,3],[3,8,4],[5,3,5]]
输出：1
解释：路径 [1,2,3,4,5] 的相邻格子差值绝对值最大为 1 ，比路径 [1,3,5,3,5] 更优。
示例 3：


输入：heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
输出：0
解释：上图所示路径不需要消耗任何体力。
 

提示：

rows == heights.length
columns == heights[i].length
1 <= rows, columns <= 100
1 <= heights[i][j] <= 10^6
 */

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {

    // 判断当前答案是否能够到达
    const directions = [[0, 1], [0, -1], [-1, 0], [1, 0]]
    const yLen = heights[0].length, xLen = heights.length;

    function check(ans) {
        const set = new Set()
        arr = [[0, 0]]
        set.add(`${0}_${0}`)
        while (arr.length) {
            const [m, n] = arr.shift()
            const val = heights[m][n]

            for (let direction of directions) {
                const [_x, _y] = direction
                const x = m + _x, y = n + _y;
                const setKey = `${x}_${y}`
                if (x >= 0 && y >= 0 && x < xLen && y < yLen && (Math.abs((heights[x][y] - val)) <= ans) && !set.has(setKey)) {
                    arr.push([x, y])
                    set.add(setKey)
                }
            }
        }
        return set.has(`${xLen - 1}_${yLen - 1}`) // 能不能到达最后一个格子
    }
    // 二分答案
    let right = 999999, left = 0, ans = 0;
    while (left <= right) {
        let mid = Math.floor((right + left) / 2);
        const isReached = check(mid)
        // console.log(mid, isReached, "left:", left, "right:", right)
        if (isReached) {
            ans = mid
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return ans
};
console.log(minimumEffortPath([[1, 2, 2], [3, 8, 2], [5, 3, 5]]))
console.log(minimumEffortPath([[1, 2, 3], [3, 8, 4], [5, 3, 5]]))
console.log(minimumEffortPath([[1, 2, 1, 1, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 2, 1, 2, 1], [1, 1, 1, 2, 1]]))