/**
 * 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

 

示例 1：

输入：nums = [3,2,3]
输出：[3]
示例 2：

输入：nums = [1]
输出：[1]
示例 3：

输入：nums = [1,2]
输出：[1,2]
 
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
    const map = new Map();
    const n = nums.length;
    const res = [];
    for (let i = 0; i < n; i++) {
        const val = nums[i];
        if (map.has(val)) {
            map.set(val, map.get(val) + 1);
        } else {
            map.set(val, 1);
        }
    }
    map.forEach((value, key) => {
        if (value > n / 3) {
            res.push(key);
        }
    });
    return res;
};

var majorityElement2 = function (nums) {
    const first = [, 0]
    const second = [, 0]

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        let [firstVal, firstCount] = first;
        let [secondVal, secondCount] = second;
        if (firstVal === val && firstCount > 0) {
            first[1]++;
        } else if (secondVal === val && secondCount > 0) {
            second[1]++;
        } else if (firstCount === 0) {
            first[0] = val;
            first[1] = 1;
        } else if (secondCount === 0) {
            second[0] = val;
            second[1] = 1;
        } else {
            first[1]--;
            second[1]--;
        }
    }
    const ans = []
    let [count1, count2] = [0, 0]
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === first[0]) {
            count1++;
        } else if (nums[i] === second[0]) {
            count2++;
        }
    }
    if (count1 > nums.length / 3) ans.push(first[0]);
    if (count2 > nums.length / 3) ans.push(second[0]);
    return ans
};

// console.log(majorityElement([3, 2, 3])); // [3]
// console.log(majorityElement([1])); // [1]
// console.log(majorityElement([1, 2])); // [1, 2]

console.log(majorityElement2([3, 2, 3])); // [3]
console.log(majorityElement2([1])); // [1]
console.log(majorityElement2([1, 2])); // [1, 2]