/**
 * 单独开辟两个存储空间left和right来存储每次递归比target小和大的序列

每次递归直接返回left、target、right拼接后的数组

浪费大量存储空间，写法简单
 */
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
    return quickSort(left).concat([arr[0]], quickSort(right))
}

/**
 * 双指针算法实现
 * https://blog.csdn.net/m0_61003706/article/details/119790406
 * https://www.conardli.top/docs/algorithm/%E6%8E%92%E5%BA%8F/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F.html
 */
function quickSort_v2(arr, start = 0, end = arr.length - 1) {
    if (end - start < 1) return
    let l = start
    let r = end
    let target = arr[start]
    while (l < r) {
        while (l < r && arr[r] >= target) {
            r--
        }
        arr[l] = arr[r]
        while (l < r && arr[l] < target) {
            l++
        }
        arr[r] = arr[l]
    }

    arr[l] = target
    quickSort_v2(arr, start, l - 1)
    quickSort_v2(arr, l + 1, end)
    return arr
}
/**
 * 怎么理解呢~
 */
function quickSort_v3(arr, start = 0, end = arr.length - 1) {
    while(start < end){
        let l = start
        let r = end
        let target = arr[start]
        while (l < r) {
            while (l < r && arr[r] >= target) r--
            if(l<r) arr[l++] = arr[r]
            while (l < r && arr[l] < target) l++
            if(l<r) arr[r--] = arr[l]
        }
        arr[l] = target
        quickSort_v3(arr,l+1,r)
        end = l - 1
    }
    return arr
}



let result = quickSort([9, 4, 3, 1, 6, 3, 8, 7])
let result2 = quickSort_v2([9, 4, 3, 1, 6, 3, 8, 7])
let result3 = quickSort_v3([9, 4, 3, 1, 6, 3, 8, 7])

console.log(result, result2,result3);