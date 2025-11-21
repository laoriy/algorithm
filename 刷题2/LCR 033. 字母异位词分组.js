/**
 * 给定一个字符串数组 strs ，将 变位词 组合在一起。 可以按任意顺序返回结果列表。

注意：若两个字符串中每个字符出现的次数都相同，则称它们互为变位词。

 

示例 1：

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
示例 2：

输入: strs = [""]
输出: [[""]]
示例 3：

输入: strs = ["a"]
输出: [["a"]]
 

提示：

1 <= strs.length <= 10^4
0 <= strs[i].length <= 100
strs[i] 仅包含小写字母
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const map = new Map()
    for (let i = 0; i < strs.length; i++) {
        const word = strs[i]
        const key = word.split('').sort().join('')
        map.set(key, ((map.get(key) ?? []).concat(word)))
    }
    return [...map.values()]
};
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
console.log(groupAnagrams([""]))
console.log(groupAnagrams(["a"]))