/**
 * 给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。
 */


const isPrimes = (x) => {
    for (let i = 2; i * i <= x; i++) {
        if (x % i === 0) return false
    }
    return true
}

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    let ans = 0
    for (let i = 2; i < n; i++) {
        ans += isPrimes(i)
    }
    return ans
};

// 以上方法会超时

/**--------------这是一条分割线---------- */


var countPrimes2 = function (n) {
    const arr = new Array(n).fill(true)
    let ans = 0
    for (let i = 2; i < n; i++) {
        if (arr[i]) {
            ans += 1
            for(let j = 2; j * i < n; j++) {
                arr[j * i] = false
            }
        }
    }
    return ans
};


var countPrimes3 = function(n) {
    const isPrime = new Array(n).fill(1);
    let ans = 0;
    for (let i = 2; i < n; ++i) {
        if (isPrime[i]) {
            ans += 1;
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    return ans;
};