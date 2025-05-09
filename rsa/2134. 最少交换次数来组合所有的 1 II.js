/**
 * 交换 定义为选中一个数组中的两个 互不相同 的位置并交换二者的值。

环形 数组是一个数组，可以认为 第一个 元素和 最后一个 元素 相邻 。

给你一个 二进制环形 数组 nums ，返回在 任意位置 将数组中的所有 1 聚集在一起需要的最少交换次数。

 

示例 1：

输入：nums = [0,1,0,1,1,0,0]
输出：1
解释：这里列出一些能够将所有 1 聚集在一起的方案：
[0,0,1,1,1,0,0] 交换 1 次。
[0,1,1,1,0,0,0] 交换 1 次。
[1,1,0,0,0,0,1] 交换 2 次（利用数组的环形特性）。
无法在交换 0 次的情况下将数组中的所有 1 聚集在一起。
因此，需要的最少交换次数为 1 。
示例 2：

输入：nums = [0,1,1,1,0,0,1,1,0]
输出：2
解释：这里列出一些能够将所有 1 聚集在一起的方案：
[1,1,1,0,0,0,0,1,1] 交换 2 次（利用数组的环形特性）。
[1,1,1,1,1,0,0,0,0] 交换 2 次。
无法在交换 0 次或 1 次的情况下将数组中的所有 1 聚集在一起。
因此，需要的最少交换次数为 2 。
示例 3：

输入：nums = [1,1,0,0,1]
输出：0
解释：得益于数组的环形特性，所有的 1 已经聚集在一起。
因此，需要的最少交换次数为 0 。
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function (nums) {
    // 搞一个滑动窗口
    const n = nums.length
    const count = nums.reduce((acc, cur) => acc + cur, 0) // 1的个数
    let zeroCount = 0;
    let ans = Infinity;
    for (let i = 0; i < count; i++) if (nums[i] === 0) zeroCount++; // 第一个滑动窗口内0的数量
    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) zeroCount--;
        if (nums[(i + count) % n] === 0) zeroCount++;
        ans = Math.min(ans, zeroCount)
    }
    return ans

};

console.log(minSwaps([0, 1, 0, 1, 1, 0, 0]))
console.log(minSwaps([0, 1, 1, 1, 0, 0, 1, 1, 0]))
console.log(minSwaps([1, 1, 0, 0, 1]))