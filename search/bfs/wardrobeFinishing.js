// 752. 打开转盘锁

// function openLock(deadends: string[], target: string): number {

// };

// LCR 130. 衣橱整理

/**
 * 
 * 
 * 家居整理师将待整理衣橱划分为 m x n 的二维矩阵 grid，其中 grid[i][j] 代表一个需要整理的格子。整理师自 grid[0][0] 开始 逐行逐列 地整理每个格子。

整理规则为：在整理过程中，可以选择 向右移动一格 或 向下移动一格，但不能移动到衣柜之外。同时，不需要整理 digit(i) + digit(j) > cnt 的格子，其中 digit(x) 表示数字 x 的各数位之和。

请返回整理师 总共需要整理多少个格子。
 */


function digit(n) {
    let len = n.toString().length;
    let result = 0
    while (len) {
        result += Math.trunc(n / (10 ** (len - 1)))
        n = n % (10 ** (len - 1))
        len--
    }
    return result
}

function wardrobeFinishing(m, n, cnt) {
    const res = new Set()
    const queue = [[0, 0]]
    let ans = 1
    const directions = [[1, 0], [0, 1]]
    while (queue.length) {
        const [i, j] = queue.shift()

        for (dir of directions) {
            const [dirI, dirJ] = dir
            const newI = i + dirI;
            const newJ = j + dirJ;

            if (newI >= m || newJ >= n || res.has(`${newI}_${newJ}`) || digit(newI) + digit(newJ) > cnt) continue;
            res.add(`${newI}_${newJ}`)
            ans += 1
            queue.push([newI, newJ])
        }
    }
    return ans

};

console.log(
    // wardrobeFinishing(4, 7, 5),
    wardrobeFinishing(38, 15, 9)

)
