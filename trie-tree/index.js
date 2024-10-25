class Trie {
    constructor() {
        this.root = {};
    }

    insert(word) {
        let node = this.root;
        for (let ch of word) {
            if (!node[ch]) {
                node[ch] = {};
            }
            node = node[ch];
        }
        node.isEnd = true;
    }
    search(word) {
        let node = this.root;
        for (let ch of word) {
            if (!node[ch]) {
                return false;
            }
            node = node[ch];
        }
        return !!node.isEnd;
    }
    #output(node, res = [], path = []) {
        const keys = Object.keys(node).filter(k => k !== 'isEnd').sort()
        if (node.isEnd) keys.unshift('isEnd')

        for (let key of keys) {
            if (key === 'isEnd') {
                res.push(path.join(''));
                continue;
            }
            path.push(key);
            this.#output(node[key], res, path);
            path.pop();
        }
        return res;
    }
    /**
     * 返回排序后的所有单词
     * @returns {string[]} Returns all the words in the trie
     */
    print() {
        return this.#output(this.root);
    }
}

// 双数组字典树
class DoubleArrayTrie {
   // 
   
}

let trie = new Trie();
trie.insert('bpple');
trie.insert('apple');
trie.insert('hello');
trie.insert('world');
trie.insert('f');
trie.insert('scroll');
trie.insert('scroller');
trie.insert('beef');

console.log(trie.search('apple')); // true
console.log(trie.search('app')); // false
console.log(trie.search('appl')); // false
trie.insert('app');
console.log(trie.search('app')); // true

console.log(trie.root); // { a: { p: { p: { l: { e: { isEnd: true }, isEnd: true } } } } }
console.log(trie.print())

let dat = new DoubleArrayTrie();
// dat.insert('apple');
// dat.insert('hello');
// dat.insert('world');
// dat.insert('f');
// dat.insert('scroll');
// dat.insert('scroller');
// dat.insert('beef');
// console.log(dat.search('apple'));
// console.log(dat.search('app'));
// console.log(dat.search('appl'));
// console.log(dat.search('app'));
