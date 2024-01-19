function searchMatrix(matrix, target) {
    let cell = matrix[0].length - 1;
    let row = matrix.length - 1;

    while (cell >= 0 && row >= 0) {
        const rowLast = matrix[0][cell]; // 第一行的最后一个值，矩阵右上角
        const cellLast = matrix[row][0]; // 第一列的最后一个值，矩阵左下角

        if (rowLast === target || cellLast === target) return true;
        if (rowLast > target) cell--
        if (cellLast > target) row--

        if (rowLast < target && cellLast < target) {
            for (let i = 0; i <= row; i++) {
                for (let j = 0; j <= cell; j++) {
                    if (matrix[i][j] === target) return true;
                }
            }
            return false
        }
    }
    return false
}


