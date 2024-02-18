function shortestPathBinaryMatrix(grid) {
    if (grid[0][0] === 1) return -1
    const m = grid.length
    const n = grid[0].length
    const res = new Array(grid.length).fill([]).map(() => new Array(n).fill(-1))
    res[0][0] = 1

    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]] // 八个方向
    const queue = [[0, 0]] // 从0,0位置开始依次走
    while (queue.length) {
        const [oldI, oldJ] = queue.shift()
        if (oldI === m - 1 && oldJ === n - 1) return res[oldI][oldJ]

        for (let i = 0; i < directions.length; i++) {
            const [dirI, dirJ] = directions[i]
            const newI = oldI + dirI
            const newJ = oldJ + dirJ
            // 四个方向超出边界 || 当前位置如果走到过 || 当前位置如果不为零 ---> 就跳过 
            if (newI < 0 || newJ < 0 || newI >= m || newJ >= n || res[newI][newJ] !== -1 || grid[newI][newJ] !== 0) continue;
            res[newI][newJ] = res[oldI][oldJ] + 1
            queue.push([newI, newJ])
        }
    }

    return -1
};

console.log(
    shortestPathBinaryMatrix([[0, 1], [1, 0]]), // 2
    shortestPathBinaryMatrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]]), //4
    shortestPathBinaryMatrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]]), //-1
)