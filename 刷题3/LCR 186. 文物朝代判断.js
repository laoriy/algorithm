/**
 * 展览馆展出来自 13 个朝代的文物，每排展柜展出 5 个文物。某排文物的摆放情况记录于数组 places，其中 places[i] 表示处于第 i 位文物的所属朝代编号。其中，编号为 0 的朝代表示未知朝代。请判断并返回这排文物的所属朝代编号是否能够视为连续的五个朝代（如遇未知朝代可算作连续情况）。

 

示例 1：

输入：places = [0, 6, 9, 0, 7]
输出：True
 

示例 2：

输入：places = [7, 8, 9, 10, 11]
输出：True
 

提示：

places.length = 5
0 <= places[i] <= 13
 */


/**
 * @param {number[]} places
 * @return {boolean}
 */
var checkDynasty1 = function (places) {
    places = places.sort((a, b) => a - b)
    // console.log(places)
    let zeroCount = 0
    while (places.length) {
        const first = places[0]
        if (first === 0) {
            zeroCount++
            places.shift()
        } else {
            break;
        }
    }
    if (places.length <= 1) return true
    for (let i = 0; i < places.length - 1; i++) {
        const cur = places[i]
        const next = places[i + 1]
        const diff = next - cur - 1
        if (diff < 0 || (diff > zeroCount)) return false
        zeroCount -= diff
    }
    return true

};

var checkDynasty = function (places) {
    const set = new Set()
    let min = 14
    let max = 0
    for (let place of places) {
        if (place !== 0) {
            if (set.has(place)) return false
            set.add(place)
            max = Math.max(max, place)
            min = Math.min(min, place)
        }
    }
    return max - min < 5

};

// console.log(checkDynasty([0, 6, 9, 0, 7]))
// console.log(checkDynasty([0, 0, 2, 2, 5]))
// console.log(checkDynasty([7, 8, 9, 10, 11]))
console.log(checkDynasty([4, 7, 5, 9, 2]))
