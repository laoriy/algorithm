/**
 * 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

 

示例 1：

输入：timePoints = ["23:59","00:00"]
输出：1
示例 2：

输入：timePoints = ["00:00","23:59","00:00"]
输出：0
 

提示：

2 <= timePoints <= 2 * 10^4
timePoints[i] 格式为 "HH:MM"
 */

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
    timePoints.sort((a, b) => {
        if (a === b) return 0
        return a > b ? 1 : -1
    })
    const MAX = 24 * 60
    let min = 24 * 60
    const [fH, fM] = timePoints[0].split(':')
    timePoints.push(`${+fH + 24}:${fM}`);
    for (let i = 0; i < timePoints.length; i++) {
        const [hours, mins] = timePoints[i].split(':')
        timePoints[i] = [hours, mins]
        if (i === 0) continue;
        const [preH, preM] = timePoints[i - 1]

        const diff = (+mins + hours * 60) - (+preM + preH * 60)
        // console.log(diff, hours, mins, '-----', preH, preM, hours * 60 + +mins)
        min = Math.min(min, Math.abs(diff));
    }
    return min
};

console.log(findMinDifference(["23:59", "00:00"]))
console.log(findMinDifference(["00:00", "23:59", "00:00"]))
console.log(findMinDifference(["00:00", "04:00", "22:00"]))
