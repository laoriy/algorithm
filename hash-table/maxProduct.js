function maxProduct(words) {
    const n = words.length;
    const mask = Array(n).fill(0);
    let ans = 0;

    for (let i = 0; i < n; i++) {
        for(const char of words[i]){
            // 1 << 将1的二进制 00000001 左移多少位
            // |= 只要此位置为有一个为1的话，就将其设置为1，都为0的话，就设置为0
            mask[i] |= 1 << char.charCodeAt()  - 'a'.charCodeAt() // 求出这个字符串对应的二进制，其中1代表这个字母存在，0代表不存在
        }

    }
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if ((mask[i] & mask[j]) === 0 && words[i].length * words[j].length > ans) {
                ans = words[i].length * words[j].length
            }
        }
    }

    return ans;
}


console.log(maxProduct(["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]));
console.log(maxProduct(["a","ab","abc","d","cd","bcd","abcd"]));
console.log(maxProduct(["a","aa","aaa","aaaa"]));
console.log(maxProduct(["eae", "ea", "aaf", "bda", "fcf", "dc", "ac", "ce", "cefde", "dabae"]));
