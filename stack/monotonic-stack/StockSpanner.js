/**
 * 901. 股票价格跨度

设计一个算法收集某些股票的每日报价，并返回该股票当日价格的 跨度 。

当日股票价格的 跨度 被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。

例如，如果未来 7 天股票的价格是 [100,80,60,70,60,75,85]，那么股票跨度将是 [1,1,1,2,1,4,6] 。

实现 StockSpanner 类：

StockSpanner() 初始化类对象。
int next(int price) 给出今天的股价 price ，返回该股票当日价格的 跨度 。
 

示例：

输入：
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
输出：
[null, 1, 1, 1, 2, 1, 4, 6]

解释：
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // 返回 1
stockSpanner.next(80);  // 返回 1
stockSpanner.next(60);  // 返回 1
stockSpanner.next(70);  // 返回 2
stockSpanner.next(60);  // 返回 1
stockSpanner.next(75);  // 返回 4 ，因为截至今天的最后 4 个股价 (包括今天的股价 75) 都小于或等于今天的股价。
stockSpanner.next(85);  // 返回 6
 */


class StockSpanner {
    constructor() {
        this.data = []
        this.maxStack = [-1] // 单调递减栈,存储的是下标
    }
    /**
     * 
     *
     * @param {type} price - description of parameter
     * @return {number} 
     */
    next(price) {
        this.data.push(price)
        while (this.maxStack && price >= this.data[this.maxStack[this.maxStack.length - 1]]) {
            this.maxStack.pop() // 将比自己小的出栈，这时候栈顶存储的就是第一个比自己大的值的下标
        }
        const top = this.maxStack[this.maxStack.length - 1]
        this.maxStack.push(this.data.length - 1)
        return this.data.length - 1 - top;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

const v = new StockSpanner()
console.log(
    v.next(100),
    v.next(80),
    v.next(60),
    v.next(70),
    v.next(60),
    v.next(75),
    v.next(85),
    v.next(185),
)