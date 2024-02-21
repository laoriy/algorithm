/**
 * 51. N 皇后
 */
function solveNQueens(n) {
    const result = []

    const boards = new Array(n).fill(null).map(() => new Array(n).fill('.'))

    function isValid(row, col) {
        for (let i = 0; i < row; i++) { // 之前的行
            for (let j = 0; j < n; j++) { // 所有的列
                if (boards[i][j] == 'Q' &&   // 发现了皇后，并且和自己同列/对角线
                    (j == col || i + j === row + col || i - j === row - col)) {
                    return false;             // 不是合法的选择
                }
            }
        }
        return true;
    }

    function dfs(row) {
        for (let col = 0; col < n; col++) {
            boards[row][col] = 'Q'
            if (isValid(row, col)) {
                if (row === n - 1) {
                    result.push(boards.slice().map(c => c.join('')))
                } else {
                    dfs(row + 1)
                }
            }
            boards[row][col] = '.'
        }

    }
    dfs(0)
    return result;
};

console.log(solveNQueens(4));