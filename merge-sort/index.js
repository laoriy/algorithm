function mergeSort(arr, l = 0, r = arr.length - 1) {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2)
    mergeSort(arr, l, mid) // left sort
    mergeSort(arr, mid + 1, r) // right sort
    const temp = []
    let p1 = l;
    let p2 = mid + 1;
    /* 合并有序数组过程1 */
    // while (p1 <= mid || p2 <= r) {
    //     if (p2 > r || (p1 <= mid && arr[p1] <= arr[p2])) { // 如果右边空了 || 右边左边没空 且 左边小于右边 ,左边放进数组
    //         temp.push(arr[p1++])
    //     } else {
    //         temp.push(arr[p2++])
    //     }
    // }

    /**合并有序数组过程2 */
    while (p1 <= mid && p2 <= r) { // 左右都不为空
        if (arr[p1] <= arr[p2]) { //  左边小于右边 ,左边放进数组
            temp.push(arr[p1++])
        } else {
            temp.push(arr[p2++])
        }
    }
    if (p1 <= mid) temp.push(...arr.slice(p1, mid + 1)) // 左边还有
    if (p2 <= r) temp.push(...arr.slice(p2, r + 1)) // 右边还有

    for (let i = l; i <= r; i++) arr[i] = temp[i - l] // 拷贝回原来的数组中
}


function merge(arr1, arr2) {
    const result = []
    while (arr1.length && arr2.length) {
        if (arr1[0] <= arr2[0]) result.push(arr1.shift())
        else result.push(arr2.shift())
    }
    return result.concat(arr1, arr2)

}
function mergeSortJs(arr) {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    return merge(mergeSortJs(left), mergeSortJs(right))
}

const arr = [2, 1, 3, 6, 9, 8, 4, 19, 10, 50, 0]
const arr2 = [2, 1, 3, 6, 9, 8, 4, 19, 10, 50, 0]

mergeSort(arr)
console.log(arr);
console.log(mergeSortJs(arr2));