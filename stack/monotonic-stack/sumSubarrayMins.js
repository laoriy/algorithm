/**
 * 907. 子数组的最小值之和
给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。

由于答案可能很大，因此 返回答案模 10^9 + 7 。

示例 1：

输入：arr = [3,1,2,4]  
输出：17
解释：
子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。 
最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
示例 2：

输入：arr = [11,81,94,43,3]
输出：444
 */


function sumSubarrayMins(arr) {

    const stack = [] // 单调递增栈
    let l = new Array(arr.length).fill(-1)
    let r = new Array(arr.length).fill(arr.length)

    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[stack[stack.length - 1]] > arr[i]) {
            let top = stack.pop()
            r[top] = i
        }
        if (stack.length) l[i] = stack[stack.length - 1]
        stack.push(i)
    }
    let ans = BigInt(0)

    for (let i = 0; i < arr.length; i++) {
        const range = (r[i] - i) * (i - l[i]) // 以arr[i]为最小值的所能构成的数组数，包含arr[i]连续子数组个数
        ans += BigInt(arr[i]) * BigInt(range)
    }

    return ans % BigInt(1000000007)
};

console.log(
    sumSubarrayMins([3, 1, 2, 4]),
    sumSubarrayMins([11, 81, 94, 43, 3])
);