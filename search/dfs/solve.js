/**
 * 130. 被围绕的区域
 * @param {string[][]} board 
 */
function solve(board) {
    let m = board.length
    let n = board[0].length

    function dfs(i, j) {
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
            return
        }
        board[i][j] = 'T' // 将O变为T
        // 深度遍历，遍历四个方向
        dfs(i - 1, j)
        dfs(i + 1, j)
        dfs(i, j - 1)
        dfs(i, j + 1)
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 第一行和最后一行，第一列和最后一列，都是边界，从边界为O的开始遍历
            if (i === 0 || i === m - 1 || j === 0 || j === n - 1 && board[i][j] === 'O') {
                dfs(i, j)
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 这一部分O是被包围的，T是没有被包围的,O变为X，T变为O
            if (board[i][j] === 'O') {
                board[i][j] = 'X'
            }
            if (board[i][j] === 'T') {
                board[i][j] = 'O'
            }
        }
    }
};