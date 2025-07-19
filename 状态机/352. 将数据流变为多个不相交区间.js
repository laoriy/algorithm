/**
 * 给你一个由非负整数 a1, a2, ..., an 组成的数据流输入，请你将到目前为止看到的数字总结为不相交的区间列表。

实现 SummaryRanges 类：

SummaryRanges() 使用一个空数据流初始化对象。
void addNum(int val) 向数据流中加入整数 val 。
int[][] getIntervals() 以不相交区间 [starti, endi] 的列表形式返回对数据流中整数的总结。
 

示例：

输入：
["SummaryRanges", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals", "addNum", "getIntervals"]
[[], [1], [], [3], [], [7], [], [2], [], [6], []]
输出：
[null, null, [[1, 1]], null, [[1, 1], [3, 3]], null, [[1, 1], [3, 3], [7, 7]], null, [[1, 3], [7, 7]], null, [[1, 3], [6, 7]]]

解释：
SummaryRanges summaryRanges = new SummaryRanges();
summaryRanges.addNum(1);      // arr = [1]
summaryRanges.getIntervals(); // 返回 [[1, 1]]
summaryRanges.addNum(3);      // arr = [1, 3]
summaryRanges.getIntervals(); // 返回 [[1, 1], [3, 3]]
summaryRanges.addNum(7);      // arr = [1, 3, 7]
summaryRanges.getIntervals(); // 返回 [[1, 1], [3, 3], [7, 7]]
summaryRanges.addNum(2);      // arr = [1, 2, 3, 7]
summaryRanges.getIntervals(); // 返回 [[1, 3], [7, 7]]
summaryRanges.addNum(6);      // arr = [1, 2, 3, 6, 7]
summaryRanges.getIntervals(); // 返回 [[1, 3], [6, 7]]
 
输入：["SummaryRanges","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals","addNum","getIntervals"]
[[],[6],[],[6],[],[0],[],[4],[],[8],[],[7],[],[6],[],[4],[],[7],[],[5],[]]
输出：[null,null,[[6,6]],null,[[6,6]],null,[[0,0],[6,6]],null,[[0,0],[4,4],[6,6]],null,[[0,0],[4,4],[6,6],[8,8]],null,[[0,0],[4,4],[6,8]],null,[[0,0],[4,4],[6,8]],null,[[0,0],[4,4],[6,8]],null,[[0,0],[4,4],[6,8]],null,[[0,0],[4,8]]]
提示：

0 <= val <= 104
最多调用 addNum 和 getIntervals 方法 3 * 104 次
 */


var SummaryRanges = function () {
    this.startMap = new Map() // 以某个值为起点的区域
    this.endMap = new Map() // 以某个值为终点的区域
    this.inserted = new Set()
};

/** 
 * @param {number} value
 * @return {void}
 */
SummaryRanges.prototype.addNum = function (value) {
    console.log(value)
    if (this.inserted.has(value)) return
    this.inserted.add(value)
    const leftInValue = this.endMap.get(value - 1)
    const rightInValue = this.startMap.get(value + 1)
    if (leftInValue && rightInValue) {
        // 1.位于两个区间中间,将两个区间合并
        const [leftStart,] = leftInValue
        const [, rightEnd] = rightInValue
        this.endMap.delete(value - 1)
        this.startMap.delete(value + 1)
        this.endMap.set(rightEnd, [leftStart, rightEnd])
        this.startMap.set(leftStart, [leftStart, rightEnd])

    } else if (leftInValue) {
        // 值紧挨着某个区间右侧
        const [leftStart, leftEnd] = leftInValue
        this.endMap.delete(leftEnd)
        this.endMap.set(value, [leftStart, value])
        this.startMap.set(leftStart, [leftStart, value])
    } else if (rightInValue) {
        // 值紧挨着某个区间左侧
        const [rightStart, rightEnd] = rightInValue
        this.startMap.delete(rightStart)
        this.endMap.set(rightEnd, [value, rightEnd])
        this.startMap.set(value, [value, rightEnd])
    } else {
        // 单独成一个区间
        this.endMap.set(value, [value, value])
        this.startMap.set(value, [value, value])
    }
};

/**
 * @return {number[][]}
 */
SummaryRanges.prototype.getIntervals = function () {
    console.log(this.endMap)
    return [...this.endMap.keys()].sort((a, b) => a - b).map(v => this.endMap.get(v))
};

/** 
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */

obj = new SummaryRanges()
obj.addNum(6)
console.log(obj.getIntervals())
obj.addNum(6)
console.log(obj.getIntervals())
obj.addNum(0)
console.log(obj.getIntervals())
obj.addNum(4)
console.log(obj.getIntervals())
obj.addNum(8)
console.log(obj.getIntervals())
obj.addNum(7)
console.log(obj.getIntervals())
obj.addNum(6)
console.log(obj.getIntervals())
obj.addNum(4)
console.log(obj.getIntervals())
obj.addNum(7)
console.log(obj.getIntervals())
obj.addNum(5)
console.log(obj.getIntervals())
