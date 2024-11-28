/**
 * 给定一个较长字符串big和一个包含较短字符串的数组smalls，设计一个方法，根据smalls中的每一个较短字符串，对big进行搜索。输出smalls中的字符串在big里出现的所有位置positions，其中positions[i]为smalls[i]出现的所有位置。

示例：

输入：
big = "mississippi"
smalls = ["is","ppi","hi","sis","i","ssippi"]
输出： [[1,4],[8],[],[3],[1,4,7,10],[5]]
 */


/**
 * t 在 s中的位置 sunday算法
 */
function sundaySearch(s, t) {
    if (!t) return []
    const lastIndex = new Map() // 黄金对齐点位，t的每个字符在
    for (let i = 0; i < t.length; i++) {
        lastIndex.set(t[i], i)
    }
    let ret = []
    for (let i = 0; i < s.length;) {
        let j = 0; // 匹配上的个数
        while (j < t.length && s[i + j] === t[j]) {
            j++
        }
        if (j === t.length) {
            ret.push(i)
            i += 1
        } else {
            const nextChar = s[i + t.length] // 下一个要参与匹配的母串的字符
            const last = lastIndex.get(nextChar)
            i += (t.length - (last || 0))
        }
    }

    return ret
}

/**
 * @param {string} big
 * @param {string[]} smalls
 * @return {number[][]}
 */
var multiSearch = function (big, smalls) {
    return smalls.map(s => sundaySearch(big, s))
};

console.log(multiSearch("mississippi", ["is", "ppi", "hi", "sis", "i", "ssippi"])) // [[1,4],[8],[],[3],[1,4,7,10],[5]]
console.log(multiSearch("sssiss", ["ss"])) // [[0,1,4]]