/**
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。


示例 1：

./images/79.1.jpg

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCCED"
输出：true
示例 2：
./images/79.2.jpg

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "SEE"
输出：true
示例 3：
./images/79.3.jpg

输入：board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = "ABCB"
输出：false
 

提示：

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board 和 word 仅由大小写英文字母组成
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    const n = board.length, m = board[0].length;
    const mark = new Array(n).fill(null).map(() => []);
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    function find(x, y, wordIdx) {
        // console.log(x, y, wordIdx)
        const char = board[x][y]
        if (char !== word[wordIdx]) return false
        if (wordIdx === word.length - 1) return true
        
        for (direction of directions) {
            const [i, j] = direction
            const nextI = x + i
            const nextJ = y + j
            if (nextI >= 0 && nextI < n && nextJ >= 0 && nextJ < m && !mark[nextI][nextJ]) {
                mark[nextI][nextJ] = 1
                const result = find(nextI, nextJ, wordIdx + 1)
                mark[nextI][nextJ] = 0
                if (result) return result
            }
        }
        return false
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // console.log('--------------->')
            mark[i][j] = 1
            const isFind = find(i, j, 0)
            if (isFind) return true
            mark[i][j] = 0
        }
    }
    return false
};


console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED'))
console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'SEE'))
console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCB'))
console.log(exist([["a"]], 'a'))
console.log(exist([["a","a"]], 'aaa'))
