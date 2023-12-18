


/**
 * Finds the minimum number of operations needed to obtain a target value.
 *
 * @param {number[]} nums - The array of numbers.
 * @param {number} x - The target value.
 * @return {number} The minimum number of operations.
 */
function minOperationsWorse(nums, x) {

    let result = -1

    function operations(arr, x, count) {
        // 传进来的count刚好，代表这条链路结束了
        if (x === 0) {
            result = result === - 1 ? count : Math.min(count, result)
            return
        }
        // 链路没结束，但是数组为空了，或者x已经小于0了。没有进行下去的必要了
        if (arr.length === 0 || x < 0) return
        console.log(x, arr.length);
        let start = arr[0]
        let end = arr[arr.length - 1]
        operations(arr.slice(1), x - start, count + 1)
        operations(arr.slice(1, -1), x - end, count + 1)
    }
    operations(nums, x, 0)
    return result
};

// 以上方法数据量大的时候会超时

// 移动窗口
function minOperations(nums, x) {
    const n = nums.length
    const sum = nums.reduce((a, b) => a + b, 0)
    if (sum < x) return -1

    let right = 0
    let leftSum = 0, rightSum = sum
    let ans = n + 1
    for (let left = -1; left < n; left++) {
        if (left !== -1) leftSum += nums[left]
        while (right < n && leftSum + rightSum > x) {
            rightSum -= nums[right]
            ++right
        }
        if (leftSum + rightSum === x) ans = Math.min(ans, left + 1 + n - right)
    }
    return ans > n ? -1 : ans


};


function binarySearch(arr, x) {
    let startPin = 0

    let endPin = arr.length - 1

    while (startPin <= endPin) {
        let mid = Math.floor((startPin + endPin) / 2)
        if (x === arr[mid]) return mid
        if (x > arr[mid]) startPin = mid + 1
        if (x < arr[mid]) endPin = mid - 1
    }


    return -1
}

function minOperations2(nums, x) {
    const n = nums.length
    let ans = n + 1
    let leftSum = 0, rightSums = [0]
    // 求出右边和
    for (let i = n - 1; i >= 0; i--) rightSums.push(rightSums[rightSums.length - 1] + nums[i])
    for (let i = 0; i < n + 1; i++) {
        const validInRight = binarySearch(rightSums, x - leftSum)
        leftSum += nums[i]
        if (validInRight === -1) continue
        if (validInRight + i > n) continue
        ans = Math.min(ans, validInRight + i)
    }
    return ans > n ? -1 : ans
};
console.log(minOperations([1, 1, 4, 2, 3], 5), minOperations2([1, 1, 4, 2, 3], 5)) // 移除2,3 ，操作次数 2
console.log(minOperations([5, 6, 7, 8, 9], 4), minOperations2([5, 6, 7, 8, 9], 4)) // 不满足，-1
console.log(minOperations([3, 2, 20, 1, 1, 3], 10), minOperations2([3, 2, 20, 1, 1, 3], 10)) // 最佳解决方案是移除后三个元素和前两个元素（总共 5 次操作），将 x 减到 0 。