
# 归并排序基础知识

- 大问题拆分成小问题递归然后合并
- 将两个有序数组合并成一个有序数组，最重要
    1. 一个新数组，加两个指针指向分别指向两个数组开头
    2. 每次将两个数组第一个较小的放到一个数组结尾，并移动指针。
- 二路归并--> 多路归并
- 大数据场景下的应用
    1. 电脑内存大小2GB，如果对一个40GB的文件进行排序：归并所需的额外空间可以放在外存，使用二十路归并排序，二十个最小值获取用堆排序。所以快排是内部排序，

![image](./images/demo.webp)
- 代码实现
    见[index.js](index.js)

# 经典面试题-归并排序基础

- 剑指 Offer 51. 数组中的逆序对：主要还是利用归并的思想，代码见[reversePairs.js](reversePairs.js)
- 23. 合并 K 个升序链表，分治思想，代码见[mergeKLists.ts](mergeKLists.ts)
- 148. 排序链表[sortList.ts](sortList.ts)
- 1305. 两棵二叉搜索树中的所有元素:先中序遍历为有序的，然后合并即可
- 327. 区间和的个数；
    - 原序列区间和值等于前缀和数组上两项相减的结果--->前缀和数组`sum`中有多少对满足`lower <= sum[j] - sum[i] <= upper 且  i < j`，转换后`sum[j] - lower >= sum[i] >= sum[j] - upper`，即`a <= sum[i] <= b`


 