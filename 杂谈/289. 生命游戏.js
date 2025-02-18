/**
 * 根据 百度百科 ， 生命游戏 ，简称为 生命 ，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。

给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： 1 即为 活细胞 （live），或 0 即为 死细胞 （dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是 同时 发生的。给你 m x n 网格面板 board 的当前状态，返回下一个状态。

给定当前 board 的状态，更新 board 到下一个状态。

注意 你不需要返回任何东西。

 

示例 1：


输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
示例 2：


输入：board = [[1,1],[1,0]]
输出：[[1,1],[1,1]]
 */

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
    const m = board.length;
    const n = board[0].length;
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]; // 8 个方向
    const needChange = []
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const v = board[i][j]
            let aliveCount = 0
            for ([dx, dy] of directions) {
                const x = i + dx
                const y = j + dy
                if (x >= 0 && x < m && y >= 0 && y < n & board[x][y] === 1) aliveCount += board[x][y]
            }
            if (v === 1) {
                // 这是活细胞
                if (aliveCount < 2 || aliveCount > 3) {
                    needChange.push([i, j, 0])
                }
            } else {
                if (aliveCount === 3) {
                    needChange.push([i, j, 1])
                }
                // 这是死细胞
            }
        }
    }
    for (const [i, j, v] of needChange) {
        board[i][j] = v
    }
    return board;
};


console.log(gameOfLife([[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]])); // [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
console.log(gameOfLife([[1, 1], [1, 0]])); // [[1,1],[1,1]]
