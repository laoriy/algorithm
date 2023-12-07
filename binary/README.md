# 二分法

- 二分查找算法
  二分算法分的是查找区间范围，根据头尾获得一个 mid，然后比较待查找的值和 mid 进行比较，确定待查找值的区间。

  二分查找泛型情况-二分模型：可以把泛型情况抽象成下面两种情形

  1. 前面一堆 0,后面一堆 1，要查找第一个 1

  2. 前面一堆 1,后面一堆 0，要查找最后一个 1

  栗子 🌰:下面一组数要找到第一个大于等于 9 的数，就可以转换成下面 0,1 的问题。 0：条件不成立，1：条件成立。
  ![images](./images/demo.webp)

  [01 模型代码](./binarySearch01.js)
  [10 模型代码](./binarySearch10.js)

- 二分中的数组和函数的关系

  任何可以应用于数组中的算法都可以应用于某种性质的函数上

# 代码

- [二分查找算法](./binarySearch.js)

# 题目

69. x 的平方根

```ts
function mySqrt(x: number): number {
  let l = 0;
  let r = x;
  let ans = -1;
  while (l <= r) {
    let mid = Math.trunc(l + (r - l) / 2);
    if (mid * mid <= x) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return ans;
}
```

35. 搜索插入位置

```ts
function searchInsert(nums: number[], target: number): number {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) r = mid;
    else l = mid + 1;
  }
  return nums[l] >= target ? l : l + 1;
}
```
