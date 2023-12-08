function searchRange(nums, target) {
    let startL = 0, startR = nums.length - 1
    let endL = 0, endR = nums.length - 1
    while(startL < startR){ // 01模型 ,求开始
        let mid = Math.floor((startL + startR) / 2)
        if(nums[mid] >= target) startR = mid
        else startL = mid + 1
    }
    while(endL < endR){ // 10模型，求结束
        let mid = Math.ceil((endL + endR) / 2)
        if(nums[mid] > target) endR = mid - 1
        else endL = mid
    }
    return [nums[startL] === target ? startL : -1, nums[endL] === target ? endL : -1]
};

console.log(searchRange([5,7,7,8,8,10],8)); // [3,4]