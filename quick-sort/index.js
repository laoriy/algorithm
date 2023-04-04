function quickSort(arr) {
    if (arr.length <= 1) return arr
    let left = []
    let right = []

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    console.log(left, right);
    return quickSort(left).concat([arr[0]], quickSort(right))
}



let result = quickSort([9, 4, 3, 1, 6, 3, 8, 7])

console.log(result);