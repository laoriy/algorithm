/**
 * 给你两个下标从 0 开始且长度为 n 的整数数组 nums1 和 nums2 ，两者都是 [0, 1, ..., n - 1] 的 排列 。

好三元组 指的是 3 个 互不相同 的值，且它们在数组 nums1 和 nums2 中出现顺序保持一致。换句话说，如果我们将 pos1v 记为值 v 在 nums1 中出现的位置，pos2v 为值 v 在 nums2 中的位置，那么一个好三元组定义为 0 <= x, y, z <= n - 1 ，且 pos1x < pos1y < pos1z 和 pos2x < pos2y < pos2z 都成立的 (x, y, z) 。

请你返回好三元组的 总数目 。

 

示例 1：

输入：nums1 = [2,0,1,3], nums2 = [0,1,2,3]
输出：1
解释：
总共有 4 个三元组 (x,y,z) 满足 pos1x < pos1y < pos1z ，分别是 (2,0,1) ，(2,0,3) ，(2,1,3) 和 (0,1,3) 。
这些三元组中，只有 (0,1,3) 满足 pos2x < pos2y < pos2z 。所以只有 1 个好三元组。
示例 2：

输入：nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
输出：4
解释：总共有 4 个好三元组 (4,0,3) ，(4,0,2) ，(4,1,3) 和 (4,1,2) 。
 */

/**
 * TODO 会超时
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var goodTriplets = function (nums1, nums2) {
    let preArr = []
    let ans = 0
    const map = new Map() // 每个元素前面的元素pre 和 该元素位置pos。
    for (let i = 0; i < nums1.length; i++) {
        const num = nums1[i]
        map.set(num, { pos: i, pre: preArr })
        preArr = preArr.concat(num)
    }
    preArr = [] // nums2中当前元素前面的元素
    for (let i = 0; i < nums2.length; i++) {
        const num = nums2[i]
        if (preArr.length) {
            const { pos, pre } = map.get(num) // 在nums1 中 当前值num前面的数字 
            const allHasInPreLen = preArr.filter(digit => new Set(pre).has(digit)).length // 同时出现在n1 和 n2 中的数字
            const onlyInNums1BeforeNum = pos - allHasInPreLen; // 再num1中num之前只有num1才有的元素数量
            const allHasAfterLen = nums2.length - 1 - i - onlyInNums1BeforeNum
            ans = ans + (allHasInPreLen * allHasAfterLen)
            // console.log(ans, 'ans--', allHasInPreLen, allHasAfterLen)
        }
        preArr.push(num)
    }
    return ans

};

console.log(goodTriplets([2, 0, 1, 3], [0, 1, 2, 3]))
console.log(goodTriplets([4,0,1,3,2], [4,1,0,2,3]))