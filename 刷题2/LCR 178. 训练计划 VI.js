/**
 * 教学过程中，教练示范一次，学员跟做三次。该过程被混乱剪辑后，记录于数组 actions，其中 actions[i] 表示做出该动作的人员编号。请返回教练的编号。

 

示例 1：

输入：actions = [5, 7, 5, 5]
输出：7
示例 2：

输入：actions = [12, 1, 6, 12, 6, 12, 6]
输出：1
 

提示：

1 <= actions.length <= 10000
1 <= actions[i] < 2^31
 */

/**
 * @param {number[]} actions
 * @return {number}
 */
var trainingPlan = function (actions) {
    const count = new Array(32).fill(0)
    for (action of actions) {
        const binaryStr = action.toString(2)
        const len = binaryStr.length
        for (let i = 0; i < len; i++) {
            if (binaryStr[i] === '1') count[32 - len + i] += 1
        }
    }
    return parseInt(count.map(v => v % 3).join(''), 2)
};

console.log(trainingPlan([5, 7, 5, 5]))
console.log(trainingPlan([12, 1, 6, 12, 6, 12, 6]))