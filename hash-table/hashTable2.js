class HashTable {
    capacity = 0;
    size = 0;
    buckets = null

    constructor(initialCapacity = 100) {
        this.buckets = new Array(initialCapacity)
        this.size = 0
        this.capacity = initialCapacity
    }
    /**
     * 
     * @param {String} s 
     * @returns Number
     */
    #hashFunc(str) {
        const seed = 131; // 也可以选择其他的质数作为种子
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = (hash * seed + str.charCodeAt(i)) % this.capacity;
        }

        return hash & 0x7FFFFFFF; // 取正数，保证返回值为非负整数
    }

    insert(s) {
        let index = this.#hashFunc(s) // 计算哈希值
        if (!this.buckets[index]) this.buckets[index] = []
        if (this.buckets[index].indexOf(s) === -1) {
            this.buckets[index].unshift(s)
            this.size++
            if (this.size / this.capacity > 0.75) this.expand() // 容量大于0.75 需要扩容了
        }
    }
    find(s) {
        let index = this.#hashFunc(s)
        if (!this.buckets[index]) return false
        return this.buckets[index].indexOf(s) !== -1
    }
    /**
     * 扩容
     */
    expand() {
        const newSize = this.capacity * 2
        const newHashTable = new HashTable(newSize)
        this.buckets.flat().forEach(element => {
            newHashTable.insert(element)
        });
        this.buckets = newHashTable.buckets
        this.capacity = newSize
    }

}

// 示例用法
const hashTable = new HashTable(5);
hashTable.insert("apple");
hashTable.insert("dbanana");
hashTable.insert("apple");
hashTable.insert("apple1");
console.log(hashTable);
hashTable.insert("fapple3");
hashTable.insert("fapple2");
console.log(hashTable);
console.log(hashTable.find("apple")); // true
console.log(hashTable.find("fapple3")); // true
console.log(hashTable.find("fapple2")); // true
console.log(hashTable.find("dbanana")); // true
console.log(hashTable.find("orange")); // false