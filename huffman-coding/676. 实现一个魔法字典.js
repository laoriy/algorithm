/**
 * 设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。

实现 MagicDictionary 类：

MagicDictionary() 初始化对象
void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。
 

示例：

输入
["MagicDictionary", "buildDict", "search", "search", "search", "search"]
[[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
输出
[null, null, false, true, false, false]

解释
MagicDictionary magicDictionary = new MagicDictionary();
magicDictionary.buildDict(["hello", "leetcode"]);
magicDictionary.search("hello"); // 返回 False
magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
magicDictionary.search("hell"); // 返回 False
magicDictionary.search("leetcoded"); // 返回 False
 */


var MagicDictionary = function () {
    this.words = {}
};

MagicDictionary.prototype.insert = function (word) {
    // 构建字典树
    let node = this.words
    for (let i = 0; i < word.length; i++) {
        const char = word[i]
        if (!node[char]) node[char] = {}
        node = node[char]
    }
    Object.defineProperty(node, 'end', {
        value: true,
        enumerable: false
    })
}


/** 
 * @param {string[]} dictionary
 * @return {void}
 */
MagicDictionary.prototype.buildDict = function (dictionary) {
    for (let word of dictionary) {
        this.insert(word)
    }
};

const allChars = 'abcdefghijklmnopqrstuvwxyz'
/**
 * 有几个字符不同
 */
MagicDictionary.prototype._search = function (searchWord, pos, node, n) {
    if (pos === searchWord.length) return n === 0 && node.end
    const char = searchWord[pos]
    if (node[char]) {
        if (this._search(searchWord, pos + 1, node[char], n)) return true
    }
    if (n > 0) {
        for (let j = 0; j < allChars.length; j++) { // 如果没有这个字符, 则遍历所有的字符
            const otherChar = allChars[j]
            if (char === otherChar || !node[otherChar]) continue
            if (this._search(searchWord, pos + 1, node[otherChar], n - 1)) {
                return true
            }
        }
    }
    return false
};
/** 
 * @param {string} searchWord
 * @return {boolean}
 */
MagicDictionary.prototype.search = function (searchWord) {
    return this._search(searchWord, 0, this.words, 1)
};

/** 
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */


const magicDictionary = new MagicDictionary()
magicDictionary.buildDict(["hello", "leetcode"])
console.log(magicDictionary.search("hello")); // 返回 False
console.log(magicDictionary.search("hhllo")); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
console.log(magicDictionary.search("hell")); // 返回 False
console.log(magicDictionary.search("leetcoded")); // 返回 False
