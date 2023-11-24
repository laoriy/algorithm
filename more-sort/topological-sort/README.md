# 拓扑排序

拓扑排序（Topological Sorting）是一种图论算法，用于解决有向无环图（DAG，Directed Acyclic Graph）中的节点排序问题。

## 拓扑排序

- [拓扑排序-JS 简易版](https://juejin.cn/post/7291492537105580087?searchId=202311070943476A8640E9F3FFCD7411C8)

- [拓扑排序在前端开发中的应用场景](https://juejin.cn/post/7276675247597338635?searchId=202311070943476A8640E9F3FFCD7411C8)

## 题目

207. 课程表

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0); // 每个课程的入度数组

  const map = {}; // 邻接表

  for (let i = 0; i < prerequisites.length; i++) {
    const [afterCourse, beforeCourse] = prerequisites[i];
    inDegree[afterCourse]++; // 求课的初始入度值
    if (map[beforeCourse]) {
      // 当前课已经存在于邻接表
      map[beforeCourse].push(afterCourse); // 添加依赖它的后续课
    } else {
      // 当前课不存在于邻接表
      map[beforeCourse] = [afterCourse];
    }
  }

  const queue = [];
  for (let i = 0; i < inDegree.length; i++)
    if (inDegree[i] === 0) queue.push(i);
  // const queue = inDegree.map((v,i) => v === 0 ? i : null).filter(v=>v !== null) // 所有入度为0的课入列
  let count = 0;
  while (queue.length) {
    const curCourse = queue.shift(); // 当前选的课
    count++; // 选课数+1
    const curCourseAfterCourse = map[curCourse]; // 获取这门课对应的后续课
    if (curCourseAfterCourse?.length) {
      for (let i = 0; i < curCourseAfterCourse.length; i++) {
        inDegree[curCourseAfterCourse[i]]--; // 依赖它的后续课的入度-1
        if (inDegree[curCourseAfterCourse[i]] === 0)
          queue.push(curCourseAfterCourse[i]);
      }
    }
  }
  return count === numCourses;
}
```
