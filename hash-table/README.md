# 哈希表

## 简单介绍

- 索引数据
- 哈希函数：利用数组快速存取数据的特性，将任意数据类型映射到数组的下标
- 哈希操作：从高纬空间到低纬空间的映射
- 哈希冲突：两个元素可能被映射到同一个位置，永远不要幻想没有哈希冲突，而是出现冲突时要解决哈希冲突
  1. 开发定址法:下标冲突时，在已有下标基础上进行再计算，去探测到有可能不冲突的新的一个下标位置
     - 线性探测法
  2. 再哈希法：设计多个哈希函数，冲突时丢给下一个哈希函数，治标不治本。
  3. 建立公共溢出区：所以发生冲突的，都放入溢出缓冲区，其可以使用其他算法进行维护
  4. 链式地址法（拉链法）：哈希表每个位置存储的是链表的头结点

## 代码

参考：

- [BKDR hash](https://blog.csdn.net/qq_40342400/article/details/127232662)

实现

- [HashTable 开发地址法](./hashTable.js)
- [HashTable 拉链法](./hashTable2.js)

## 布隆过滤器(Bloom Filter)

- 传统哈希表，存储空间与元素数量有关
- 布隆过滤器，存储空间与元素数量无关

1. [什么是布隆过滤器？如何解决高并发缓存穿透问题？](https://mp.weixin.qq.com/s/WGz7DelyB1yqGjhydTc2QQ)
2. [5 分钟搞懂布隆过滤器，掌握亿级数据过滤算法](https://mp.weixin.qq.com/s/DeKedpyUZ5iAfCVWJLkfxA)

### 布隆过滤器应用场景

1. 解决缓存穿透
2. 网页爬虫对 URL 的去重，避免爬取相同的 URL 地址
3. 反垃圾邮件，从数十亿个垃圾邮件列表中判断某邮箱是否垃圾邮箱

## 题目

705. 设计哈希集合

```ts
class MyHashSet {
  #base = 131;
  data: number[][];
  constructor() {
    this.data = new Array(this.#base);
  }

  add(key: number): void {
    const hash = this.#hash(key);
    if (!this.data[hash]) {
      this.data[hash] = [key];
    } else if (!this.data[hash].includes(key)) {
      this.data[hash].unshift(key);
    }
  }

  remove(key: number): void {
    const hash = this.#hash(key);
    if (!this.data[hash]) return;
    const index = this.data[hash].indexOf(key);
    index !== -1 && this.data[hash].splice(index, 1);
  }

  contains(key: number): boolean {
    const hash = this.#hash(key);
    if (!this.data[hash]) return false;
    return this.data[hash].includes(key);
  }
  #hash(key: number) {
    const index = key % this.#base;
    return index;
  }
}
```

706. 设计哈希映射

```ts
class MyHashMap {
  #base = 131;
  data: Map<number, number>[];
  constructor() {
    this.data = new Array(this.#base);
  }

  put(key: number, value: number): void {
    const hash = this.#hash(key);
    if (!this.data[hash]) this.data[hash] = new Map();
    this.data[hash].set(key, value);
  }

  get(key: number): number {
    const hash = this.#hash(key);
    if (!this.data[hash]) return -1;
    return this.data[hash].get(key) ?? -1;
  }

  remove(key: number): void {
    const hash = this.#hash(key);
    if (this.data[hash]) {
      this.data[hash].delete(key);
    }
  }

  #hash(key: number) {
    const index = key % this.#base;
    return index;
  }
}
```

- 面试题 16.25. LRU 缓存

  1. 解法 1：哈希链表 --> O(1)时间复杂度
     [代码](./HashLink.ts)
  2. 解法 2：

  ```ts
  class LRUCache {
    valueMap: Map<number, number>;
    keyArr: number[];
    size: number;
    capacity: number;
    constructor(capacity: number) {
      this.capacity = capacity;
      this.valueMap = new Map<number, number>();
      this.keyArr = [];
      this.size = 0;
    }

    get(key: number): number {
      const keyIndex = this.keyArr.indexOf(key);
      if (keyIndex === -1) return -1;
      this.keyArr.splice(keyIndex, 1);
      this.keyArr.push(key);
      return this.valueMap.get(key);
    }

    put(key: number, value: number): void {
      if (this.get(key) !== -1) {
        this.valueMap.set(key, value);
        return;
      }
      if (this.size === this.capacity) {
        const key = this.keyArr.shift();
        this.valueMap.delete(key);
        this.size -= 1;
      }
      this.keyArr.push(key);
      this.valueMap.set(key, value);
      this.size += 1;
      console.log(this.keyArr, this.valueMap);
    }
  }
  ```

187. 重复的 DNA 序列

```ts
function findRepeatedDnaSequences(s: string): string[] {
  const oMap = new Map();

  for (let i = 0; i <= s.length - 10; i++) {
    let str = s.substring(i, 10 + i);
    oMap.set(str, (oMap.get(str) || 0) + 1);
  }
  const arr = [];
  oMap.forEach((v, s) => {
    if (v >= 2) arr.push(s);
  });
  return arr;
}
```

318. 最大单词长度乘积
     [代码](./maxProduct.js)

240. 搜索二维矩阵 II [代码](./searchMatrix.js)
     - 杨氏矩阵中，需要注意的右上角和左下角的值；
     - 如果右上角比目标值大，说明不在最后一列；
     - 如果左上角比目标值大，说明不在最后一行

430. 扁平化多级双向链表
```ts
function flatten(head: Node | null): Node | null {
    let p = head;
    const stack = []
    while(p){
        const pNext = p.next
        /**
         * 如果p.child存在就将 p.child 和 p 进行一个双向关联
         * 然后将p.child移除
         * 对p.next 也就是之前的child进行一次扁平化操作
         */

        if(p.child){ 
            pNext && stack.push(pNext) // 如果p.next有值，就入栈
            p.next = p.child
            p.child.prev = p
            p.child = null
            p = flatten(p.next)
        } else {
            if(!pNext && stack.length) { 
                const pre = stack.pop() // 如果p.next没有值，就出栈和p进行双向关联
                p.next = pre
                pre.prev = p   
                p = null
            } else {
                p = pNext
            }
        }
    }
    return head
};
```