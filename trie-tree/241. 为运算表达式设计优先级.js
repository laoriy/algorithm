/**
 * 给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。

生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 104 。

 

示例 1：

输入：expression = "2-1-1"
输出：[0,2]
解释：
((2-1)-1) = 0 
(2-(1-1)) = 2
示例 2：

输入：expression = "2*3-4*5"
输出：[-34,-14,-10,-10,10]
解释：
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
 */
const map = new Map()
/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
    if (map.has(expression)) return map.get(expression)
    const res = []
    for (let i = 0; i < expression.length; i += 1) {
        const char = expression[i]
        if (char === '+' || char === '-' || char === '*') {
            let left = diffWaysToCompute(expression.slice(0, i))
            let right = diffWaysToCompute(expression.slice(i + 1))
            for (let l of left) {
                for (let r of right) {
                    if (char === '+') {
                        res.push(l + r)
                    } else if (char === '-') {
                        res.push(l - r)
                    } else if (char === '*') {
                        res.push(l * r)
                    }
                }
            }
        }
    }
    if (res.length === 0) res.push(Number(expression))
    map.set(expression, res)
    return res
}

console.log(diffWaysToCompute("2-1-1")) // [2,0]
console.log(diffWaysToCompute("2*3-4*5")) // [-34,-14,-10,-10,10]