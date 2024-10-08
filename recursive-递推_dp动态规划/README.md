# 数学归纳法

1. 验证 k0 成立
2. 证明如果 ki 成立，那么 ki+1 也成立
3. 联合步骤 1 和步骤 2，可以证明 n >= 2，证明 k0 -> kn 成立

# 如何求解递推问题

1. 确定递推状态
   一个函数符号 f(x)，外加这个函数符号的含义描述
   一般函数所对应的值，就是要求解的值
2. 确定递推公式（ki => ki+1）
   确定 f(x) 究竟依赖于哪些 f(y) 的值
3. 确定递推边界(k0)

4. 程序实现
   递归|| 循环

## 斐波那契数列递推公式

f(n) = f(n-1) + f(n-2)
f(n) 含义描述为 第 n 个斐波那契数

# 动态规划（Dynamic Programming）

## 状态转移方程

1.  状态：一个数学符号，外加一个语义描述
2.  决策：从所有可能产生最优解的状态中，选择一个最大值
3.  阶段：本阶段只依赖于上一个阶段

## 背包问题

问题描述：给定 N 个物品和一个容量有限为 V 的背包，每个物品有两种属性：v[i]（该物品的体积） 和 w[i]（该物品的价值，即权重），求解在不超过背包最大容量的情况下，能装下物品的最大价值是多少。

背包种类

1. 01 背包：每件物品只有一个（即每件物品要么装，要么不装，只有两种状态，故称 01 背包），[代码](./01背包.js)

   0/1 背包问题是最基本的背包问题，每种物品只有一个，可以选择放入背包或不放入。
   背包问题是一类组合优化的 NP 问题。
   给定一组物品，每种物品都有自己的重量和价值，在不超过背包承重限制的前提下，如何选择物品使得背包内物品的总价值最大。

2. 完全背包：每件物品有无限个
3. 多重背包：每种物品有是 s[i]个（不同物品的个数可能不同） 4.分组背包：物品被分为 N 组，每组有若干种，每组最多只能取一个物品
