/**
 * 给你一个数组 nums ，请你完成两类查询。

其中一类查询要求 更新 数组 nums 下标对应的值
另一类查询要求返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 ，其中 left <= right
实现 NumArray 类：

NumArray(int[] nums) 用整数数组 nums 初始化对象
void update(int index, int val) 将 nums[index] 的值 更新 为 val
int sumRange(int left, int right) 返回数组 nums 中索引 left 和索引 right 之间（ 包含 ）的nums元素的 和 （即，nums[left] + nums[left + 1], ..., nums[right]）
 

示例 1：


输入：
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
输出：
[null, 9, null, 8]

解释：
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // 返回 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1,2,5]
numArray.sumRange(0, 2); // 返回 1 + 2 + 5 = 8
 */

/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
    this.len = nums.length;
    this.c = new Array(this.len + 1).fill(0); // 树状数组
    this.nums = new Array(this.len).fill(0);
    for (let i = 0; i < this.len; i++) {
        this.update(i, nums[i]);
    }
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function (index, val) {
    const diff = val - (this.nums?.[index] || 0);
    for (let i = index + 1; i <= this.len; i += lowbit(i)) {
        this.c[i] += diff;
    }
    this.nums[index] = val;

};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function (left, right) {
    return this.query(right + 1) - this.query(left);
};

NumArray.prototype.query = function (index) {
    let res = 0;
    for (let i = index; i > 0; i -= lowbit(i)) {
        res += this.c[i];
    }
    return res;
}

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */


function lowbit(x) {
    return x & -x;
}

const numArray = new NumArray([1, 3, 5]);
console.log(numArray.sumRange(0, 2));// 返回 1 + 3 + 5 = 9
console.log(numArray);

numArray.update(1, 2);   // nums = [1,2,5]
console.log(numArray);

console.log(numArray.sumRange(0, 2));// 返回 1 + 2 + 5 = 8