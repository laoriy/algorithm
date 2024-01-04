class HashTable {
    capacity = 0;
    size = 0;
    buckets = null

    constructor(initialCapacity = 100) {
        this.buckets = new Array(100)
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

            // 如果探测次数过多，可能发生哈希表满的情况，可以根据需要进行处理
            // 这里只是简单地抛出一个错误
            // 后面改成动态扩容
            if (probeCount > this.capacity) {
                throw new Error("Hash buckets is full");
            }
        }
        return currentIndex
    }
    insert(s) {
        let index = this.#hashFunc(s) // 计算哈希值
        index = this.#reCalcIndex(index,s) //冲突处理 
        if(this.buckets[index] !== s) this.size++
        this.buckets[index] = s
    }
    find(s) {
        let index = this.#hashFunc(s) 
        index = this.#reCalcIndex(index,s) 
        return this.buckets[index] === s
    }
}

// 示例用法
const hashTable = new HashTable();
hashTable.insert("apple");
hashTable.insert("banana");
hashTable.insert("apple");
hashTable.insert("apple1");
hashTable.insert("apple3");
hashTable.insert("apple2");
console.log(hashTable);
console.log(hashTable.find("apple")); // true
console.log(hashTable.find("apple3")); // true
console.log(hashTable.find("apple2")); // true
console.log(hashTable.find("banana")); // true
console.log(hashTable.find("orange")); // false