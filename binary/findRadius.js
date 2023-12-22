/**在heaters中寻找距离house最近的加热器位置 */
function searchNearest(heaters, house) {

    let start = 0, end = heaters.length - 1
    while (start < end) {
        let mid = Math.floor((start + end) / 2)
        if (heaters[mid] >= house) end = mid
        else start = mid + 1
    }
    // console.log(start, 'start');
    // //没找到
    // if (heaters[start] !== house) {
    //     const distance = []
    //     if (heaters[start]) distance.push(Math.abs(heaters[start] - house))
    //     if (heaters[start - 1]) distance.push(Math.abs(heaters[start - 1] - house))
    //     console.log(house, 'house', distance);

    //     return Math.min(...distance)
    // }

    // return 0 // 找到了半径为0即可
    return start
}

function findRadius(houses, heaters) {
    // 先将加热器进行排序 
    heaters.sort((a, b) => a - b)
    // 然后找出每个房间最近的加热器的位置，
    // 其实就是在heaters中找到大于等于house[i]的位置，然后判断其前后的距离，得出该房间可以供暖的最小供暖期半径
    // 再将所有最小值中的最大值返回
    let res = 0
    for (let i = 0; i < houses.length; i++) {
        const j = searchNearest(heaters, houses[i]) // 先在加热器中找一个尽可能接近房间的位置
        const radiusA = Math.abs(heaters[j] - houses[i]) // 和房间位置求出一个半径
        const radiusB = j ? houses[i] - heaters[j - 1] : radiusA + 1
        res = Math.max(res, Math.min(radiusA, radiusB))
    }
    // for (let i = 0; i < houses.length; i++) {
    //     const radius = searchNearest(heaters, houses[i])
    //     res = Math.max(res, radius)
    // }
    return res
};

console.log(findRadius([1, 2, 5], [2, 5]))