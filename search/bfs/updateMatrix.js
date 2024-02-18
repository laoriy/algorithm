var updateMatrix = function (mat) {
    const m = mat.length;
    const n = mat[0].length;
    const result = []
    const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]] // 4次分别代表上下左右
    const queue = []

    for (let i = 0; i < m; i++) {
        if (!result[i]) result[i] = []
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                queue.push([i, j]) // 将所有为 0 的加入队列
                result[i][j] = 0
            } else {
                result[i][j] = -1
            }
        }
    }

    while (queue.length) {
        const [i, j] = queue.shift()
        for (let dir of directions) { // 将当前的位置 进行上下左右四个方向移动得到新位置
            const newI = i + dir[0]
            const newJ = j + dir[1]

            if (newI < 0 || newJ < 0 || newI >= m || newJ >= n || result[newI][newJ] !== -1) continue;
            result[newI][newJ] = result[i][j] + 1;
            queue.push([newI, newJ])
        }
    }
    return result;
};

console.log(updateMatrix([[0, 0, 0], [0, 1, 0], [0, 0, 0]]),
    updateMatrix([[0, 0, 0], [0, 1, 0], [1, 1, 1]]))

