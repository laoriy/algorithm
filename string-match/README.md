# 字符串匹配算法

- 母串：主串
- 模式串：子串

单模匹配问题： 只有一个匹配
模式匹配问题： 存不存在

## 暴力匹配 Brute force

用 模式串 和 母串每一位对齐进行匹配， 复杂度 O(n\*m)

## KMP 算法 (Knuth–Morris–Pratt)

将 模式串 和母串对比的问题转换为 模式串 和 模式串对比的问题，
预处理模式串 以每一位结尾的字符串 的最长前缀后缀，然后根据最长前缀后缀， 匹配模式串。
适合处理流 数据

## Sunday 算法(https://www.jianshu.com/p/2e6eb7386cd3)

初始化模式串每个字符出现的最远位置,然后和母串匹配，如果匹配失败，则查找主串参与匹配的下一个位置是否在模式串中，如存在就对齐最远的位置继续匹配，如果不存在，就跳过整段匹配，然后从下一个位置开始匹配
母串是已知的，不适合流式数据处理

## Shift And 算法

将模式串处理成 二进制数
