/**
 * 给你一个产品数组 products 和一个字符串 searchWord ，products  数组中每个产品都是一个字符串。

请你设计一个推荐系统，在依次输入单词 searchWord 的每一个字母后，推荐 products 数组中前缀与 searchWord 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，请按字典序返回最小的三个。

请你以二维列表的形式，返回在输入 searchWord 每个字母后相应的推荐产品的列表。

 

示例 1：

输入：products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
输出：[
["mobile","moneypot","monitor"],
["mobile","moneypot","monitor"],
["mouse","mousepad"],
["mouse","mousepad"],
["mouse","mousepad"]
]
解释：按字典序排序后的产品列表是 ["mobile","moneypot","monitor","mouse","mousepad"]
输入 m 和 mo，由于所有产品的前缀都相同，所以系统返回字典序最小的三个产品 ["mobile","moneypot","monitor"]
输入 mou， mous 和 mouse 后系统都返回 ["mouse","mousepad"]
示例 2：

输入：products = ["havana"], searchWord = "havana"
输出：[["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
示例 3：

输入：products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
输出：[["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
示例 4：

输入：products = ["havana"], searchWord = "tatiana"
输出：[[],[],[],[],[],[],[]]
 */

class Trie {
    constructor() {
        this.root = {}
    }
    insert(word) {
        let node = this.root
        for (let char of word) {
            if (!node[char]) {
                node[char] = {}
            }
            node = node[char]
            const nodeSearch = node.search || []
            nodeSearch.push(word)
            nodeSearch.sort()
            if (nodeSearch.length > 3) nodeSearch.pop()
            Object.defineProperty(node, 'search', {
                value: nodeSearch,
                enumerable: false
            })

        }
    }
    search(word) {
        let node = this.root
        for (let char of word) {
            if (!node[char]) {
                return []
            }
            node = node[char]
        }
        return node.search || []
    }
}

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
    const trie = new Trie()
    for (let product of products) {
        trie.insert(product)
    }
    const res = []
    for (let i = 1; i <= searchWord.length; i++) {
        res.push(trie.search(searchWord.slice(0, i)))
    }
    return res
};

console.log(
    suggestedProducts(["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"),
    suggestedProducts(["havana"], "havana"),
    suggestedProducts(["bags", "baggage", "banner", "box", "cloths"], "bags"),
    suggestedProducts(["havana"], "tatiana")
) // [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]