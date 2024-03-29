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
    #reCalcIndex(currentIndex, s) {
        let probeCount = 0;
        while (this.buckets[currentIndex] !== undefined && this.buckets[currentIndex] !== s) {
            currentIndex = (currentIndex + 1) % this.capacity; // 线性探测下一个位置
            probeCount++;
        }
        return currentIndex
    }
    insert(s) {
        let index = this.#hashFunc(s) // 计算哈希值
        index = this.#reCalcIndex(index, s) //冲突处理 
        if (this.buckets[index] !== s) {
            this.size++
            this.buckets[index] = s
            if (this.size / this.capacity > 0.75) this.expand() // 容量大于0.75 需要扩容了
        }

    }
    find(s) {
        let index = this.#hashFunc(s)
        index = this.#reCalcIndex(index, s)
        return this.buckets[index] === s
    }
    /**
     * 扩容
     */
    expand() {
        const newSize = this.capacity * 2
        const newHashTable = new HashTable(newSize)
        this.buckets.forEach(element => {
            newHashTable.insert(element)
        });
        this.buckets = newHashTable.buckets
        this.capacity = newSize
    }

}

// 示例用法
const hashTable = new HashTable(5);
hashTable.insert("apple");
hashTable.insert("banana");
hashTable.insert("apple");
hashTable.insert("apple1");
console.log(hashTable);
hashTable.insert("apple3");
hashTable.insert("apple2");
console.log(hashTable);
console.log(hashTable.find("apple")); // true
console.log(hashTable.find("apple3")); // true
console.log(hashTable.find("apple2")); // true
console.log(hashTable.find("banana")); // true
console.log(hashTable.find("orange")); // false