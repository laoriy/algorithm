function searchRange(nums, target) {
    let startL = 0, startR = nums.length - 1
    let endL = 0, endR = nums.length - 1
    while (startL < startR) { // 01模型 ,求开始
        let mid = Math.floor((startL + startR) / 2)
        if (nums[mid] >= target) startR = mid
        else startL = mid + 1
    }
    while (endL < endR) { // 10模型，求结束
        let mid = Math.ceil((endL + endR) / 2)
        if (nums[mid] > target) endR = mid - 1
        else endL = mid
    }
    return [nums[startL] === target ? startL : -1, nums[endL] === target ? endL : -1]
};


/**寻找第一个大于等于target的下标 */
function binarySearch01(nums, target) {
    let start = 0, end = nums.length - 1
    while (start < end) {
        let mid = Math.floor((start + end) / 2)
        if (nums[mid] >= target) end = mid
        else start = mid + 1
    }
    return start
}

/**只是用01模型进行查找就可以完成 */
function searchRange2(nums, target) {
    const start = binarySearch01(nums, target)
    console.log(start)
    if(nums[start] !== target) return [-1,-1]
    if(start === nums.length - 1) return [start,start]
    const end = binarySearch01(nums, target + 1)
    return [start, nums[end] === target ? end : end - 1]
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3,4]
console.log(searchRange2([5, 7, 7, 8, 8, 10], 8)); // [3,4]