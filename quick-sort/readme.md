# 为什么排序算法重要？

- 问题系统熵决定了一个问题被解决的难易程度

# 快速排序基础知识

- 什么是快速排序：选一个基准值，大于的放后面，小于的放前面

# 从 C++ STL 学习快速排序

1. 单边递归法
2. 无监督 partition 方法
3. 三点取中法
4. 小数据规模，停止快排过程
5. 使用插入排序进行首尾

混合排序： 快速排序 + 堆排序
插入排序：

# 题目

- 912. 排序数组

```js
// function quickSort(nums: number[]): number[]{
//     if(nums.length < 2) return nums
//     let [t] = nums
//     let left =[]
//     let right = []
//     for(let i = 1; i<nums.length;i++){
//         if(nums[i] > t) {
//             right.push(nums[i])
//         } else {
//             left.push(nums[i])
//         }
//     }
//     return quickSort(left).concat([t]).concat(quickSort(right))
// }

function quickSort_v2(
  nums: number[],
  start = 0,
  end = nums.length - 1
): number[] {
  if (end - start < 1) return nums;
  let l = start;
  let r = end;
  let target = nums[start];

  while (l < r) {
    while (l < r && nums[r] >= target) r--;
    nums[l] = nums[r];
    while (l < r && nums[l] < target) l++;
    nums[r] = nums[l];
  }
  nums[l] = target;
  quickSort_v2(nums, start, l - 1);
  quickSort_v2(nums, l + 1, end);
  return nums;
}

function sortArray(nums: number[]): number[] {
  return quickSort_v2(nums);
}
```

- 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面

```js
function swap(nums: number[], x: number, y: number) {
  let t = nums[x];
  nums[x] = nums[y];
  nums[y] = t;
}

function exchange(nums: number[]): number[] {
  if (nums.length < 2) return nums;
  const len = nums.length;
  let x = 0;
  let y = nums.length - 1;
  do {
    // 找到一个偶数
    if (x < len && nums[x] % 2 !== 0) {
      x++;
    }
    // 找到一个奇数
    if (y >= 0 && nums[y] % 2 == 0) {
      y--;
    }
    if (x <= y && nums[x] % 2 == 0 && nums[y] % 2 != 0) {
      swap(nums, x, y);
      x++;
      y--;
    }
  } while (x <= y);
  return nums;
}
```

- 148. 排序链表

```js
function sortList(head: ListNode | null): ListNode | null {
  if (head === null) return head;
  let l = head.val;
  let r = head.val;
  let mid;
  let p = head;
  let q = null;
  let h1 = null;
  let h2 = null;
  // 求出最大最小值
  while (p) {
    l = Math.min(p.val, l);
    r = Math.max(p.val, r);
    p = p.next;
  }
  if (l === r) return head;
  // 得出一个中间值
  mid = (l + r) / 2;
  // 将链表分成两部分
  p = head;
  while (p) {
    q = p.next;
    if (p.val <= mid) {
      p.next = h1;
      h1 = p;
    } else {
      p.next = h2;
      h2 = p;
    }
    p = q;
  }
  h1 = sortList(h1);
  h2 = sortList(h2);
  p = h1;
  // 拼接链表
  while (p.next) p = p.next;
  p.next = h2;
  return h1;
}
```

75. 颜色分类

```js
function swap(arr, x, y) {
  const t = arr[x];
  arr[x] = arr[y];
  arr[y] = t;
}

function three_partition(nums: number[], l, r, mid) {
  if (l >= r) return;
  let x = -1;
  let y = r + 1;
  let i = l;

  while (i < y) {
    if (nums[i] === mid) {
      i++;
    } else if (nums[i] < mid) {
      //比mid小，往前放，此时交换过来的值最大只可能是1，所以进行i++。进行下一个
      x++;
      swap(nums, x, i);
      i++;
    } else if (nums[i] > mid) {
      //比mid大，往后放，此时交换过来的值还需要再进行和mid进行比较，所以不进行i++
      y--;
      swap(nums, y, i);
    }
  }
}

function sortColors(nums: number[]): void {
  three_partition(nums, 0, nums.length - 1, 1);
}
```

95. 不同的二叉搜索树 II

```js
function recursion(start: number, end: number) {
  if (start > end) return [null];
  let allTree = [];
  for (let i = start; i <= end; i++) {
    let leftTree = recursion(start, i - 1);
    let rightTree = recursion(i + 1, end);
    for (let left of leftTree) {
      for (let right of rightTree) {
        let cur = new TreeNode(i);
        cur.left = left;
        cur.right = right;
        allTree.push(cur);
      }
    }
  }
  return allTree;
}

function generateTrees(n: number): Array<TreeNode | null> {
  if (n === 0) return [];
  return recursion(1, n);
}
```

394. 字符串解码

```ts
// function decodeString(s: string): string {
//     while(s.includes('[')){
//         const [matched] = s.match(/\d+\[[a-z]+\]/)
//         if(matched){
//             const [n,v] = matched.split('[')
//             s = s.replace(matched,v.slice(0,-1).repeat(Number(n)))
//         }
//     }
//     return s

// };

function decodeString(s: string): string {
  let numStack = [];
  let strStack = [];
  let num = 0,
    result = "";
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (/\d/.test(item)) {
      // 是数字
      num = num * 10 + +item;
    } else if (item === "[") {
      numStack.push(num);
      strStack.push(result);
      result = "";
      num = 0;
    } else if (item === "]") {
      let ctn = numStack.pop();
      result = strStack.pop() + result.repeat(ctn);
    } else {
      result += item;
    }
  }
  return result;
}
```

11. 盛最多水的容器,[题解](https://leetcode.cn/problems/container-with-most-water/solutions/94102/on-shuang-zhi-zhen-jie-fa-li-jie-zheng-que-xing-tu/)

```js
function maxArea(height: number[]): number {
  let l = 0;
  let r = height.length - 1;
  let ans = 0;
  while (l < r) {
    ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return ans;
}
```

470. 用 Rand7() 实现 Rand10()

```js
function rand10(): number {
  let row, col, idx;
  do {
    row = rand7();
    col = rand7();
    idx = col + (row - 1) * 7;
  } while (idx > 40);

  // return 1 + (idx - 1) % 10; // 0-39 :0-9,10-19,20-29,30-39 分别得出都是0-9
  return 10 - (idx % 10); // 0-40 分别得出1-9,0，最终是9,8,7,...10
}
```
