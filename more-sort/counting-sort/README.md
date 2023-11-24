# 计数排序

## 计数排序的应用场景

- 简单的单值排序问题，排序问题中数据的值域很有限：比如统计全国年龄分布。

## 题目

- 1122. 数组的相对排序

```ts
function relativeSortArray(arr1: number[], arr2: number[]): number[] {
  const arr2Count = Array.from({ length: arr2.length }, () => 0); // a2数字
  const baseV = [];
  const res = [];
  arr1.forEach((v) => {
    let idx = arr2.indexOf(v);
    if (idx === -1) {
      baseV.push(v);
    } else {
      arr2Count[idx]++;
    }
  });
  baseV.sort((a, b) => a - b);
  arr2Count.forEach((c, i) => {
    while (c) {
      res.push(arr2[i]);
      c--;
    }
  });
  return res.concat(baseV);
}
```

- 56. 合并区间

```ts
// 将数组的前一位和后一位分别在对应的位置上进行+1，-1操作
/**
 * [[1,4],[4,5]]
 * --->
 * [1,4]即为arr[1] +=1,arr[4] -=1  arr = [0,1,0,0,-1]
 * --->
 * [4,5]即为arr[4] +=1,arr[5] -=1  arr = [0,1,0,0,0,-1]
 * --->
 * 前缀和为[0,1,1,1,1,0] 即从arr[1]值arr[5]是连续的，合并为[1,5]
 */
function merge(intervals: number[][]): number[][] {
  const count = [];
  const result = [];

  for (const interval of intervals) {
    const [start, end] = interval;
    count[start] = (count[start] || 0) + 1; // 对应位置+1
    count[end] = (count[end] || 0) - 1; // 对应位置-1
  }
  let pre = null,
    after = null,
    num = 0; // 前缀和
  count.forEach((v, i) => {
    num += v;
    if (pre === null) pre = i;
    if (num === 0 && pre !== null) after = i;
    if (pre !== null && after !== null) {
      result.push([pre, after]);
      pre = null;
      after = null;
    }
  });
  return result;
}
```
