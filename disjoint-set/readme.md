# 并查集及经典问题

[算法 & 并查集（Union-find算法）](https://blog.csdn.net/ayydead/article/details/107696502)

[算法学习笔记(1) : 并查集](https://zhuanlan.zhihu.com/p/93647900)
### 并查集的基础知识
1. 解决的问题：连通性问题(动态连通性)
    - 传递性：如果A和B连通，B和C连通，那么可以推导出A和C连通
    - 对称性：如果 A和B是相连的，那么B和A是相连的
    - 自反性：A 和 A 是相连的
![image](./images/bingchaji.png)
2. 维护连通性的关系`Quick-find`
    1. 基于染色的思想，一开始所有点的颜色不同
    2. 连接两个点的操作，看成将一种颜色染成另一种
    3. 如果两个点的颜色一样，证明连通，否则不连通
    4. 这种方法叫做并查集的【Quick-find算法】
    5. 联通判断O(1) ,合并操作O(n)
3. `Quick-Union`算法
    1. 记录每个节点的父节点的编号,形成一个树形结构
    2. 联通判断：tree-height书稿，合并操作：tree-height树高
    3. 有效的减少树高能优化操作效率：合并a和b的子树,节点数多的作为爸爸，进行合并，称为`按秩合并`优化。
    4. `路径压缩`优化

### Quick-find代码实现
    见quick-find.js
### Quick-union代码实现
    见quick-union.js

### 算法时间复杂度
![image](./images/time-complexity.png)
### 题库
[#71. 练习题1：朋友圈](https://oj.haizeix.com/problem/71)
- 结论：merge确实慢。
### 经典面试题 - 并查集基础题目
547. 省份数量
```ts
function findCircleNum(isConnected: number[][]): number {
    let n = isConnected.length
    let u = new UnionSet(n)
    for(let i = 0;i<n;i++){
        for(let j = 0; j < i;j++){
            if(isConnected[i][j] === 1){
                u.merge(i,j)
            }
        }
    }
    let ans = 0
    for(let i = 0;i< n;i++){
        if(u.get(i) === i) ans+=1
    }
    return ans;
};
```
200. 岛屿数量
```js
function numIslands(grid: string[][]): number {
    let n =  grid.length
    let m = grid[0].length
    const u = new UnionSet(n*m)
    function getIndex(i,j){// 转换为编号
        return i * m + j
    }
    for(let i =0;i<n;i++){
        for(let j = 0;j<m;j++){
            if(grid[i][j] === '0') continue;
            // 当前节点的上下左右的都是1 则进行连接，由于是依次遍历的，实际只需要当前节点的左，上为1 就进行连接
            if(i > 0 && grid[i-1][j] === '1'){ // 与上面的点进行连接
                u.merge(getIndex(i,j), getIndex(i - 1,j))
            }
            if(j > 0 && grid[i][j - 1] === '1'){ // 与左面的点进行连接
                u.merge(getIndex(i,j), getIndex(i,j - 1))
            }
        }

    }
    let ans = 0
    for(let i =0;i<n;i++){
        for(let j = 0;j<m;j++){
            if(grid[i][j] === '1' && u.get(getIndex(i,j)) === getIndex(i,j)) ans+=1
        }
    }
    return ans
};
```
### 



