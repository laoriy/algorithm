/**
 * 基数排序LSD
 * @param {Number} arr 
 */
// function radixSort(arr) {
//     const count = Array.from({ length: 10 }, () => []) // 0-9的存储
//     const max = Math.max(...arr).toString().length
//     let m = 1 // 个位排序 
//     while (m <= max) {
//         for (let v of arr) {
//             let digit = Math.floor((v % (10 ** m)) / 10 ** (m - 1)) // 对应位的数字
//             count[digit].push(v)
//         }
//         let ind = 0;
//         for (let v of count) while (v.length) arr[ind++] = v.shift()
//         m++
//     }
// }
/**这才是八二正经的基数排序 */
var radixSort = function(nums) {
    const n = nums.length;
    if (n < 2) {
        return 0;
    }
    let exp = 1;
    const buf = new Array(n).fill(0);   
    const maxVal = Math.max(...nums);

    while (maxVal >= exp) {
        const cnt = new Array(10).fill(0);
        for (let i = 0; i < n; i++) {
            let digit = Math.floor(nums[i] / exp) % 10;
            cnt[digit]++;
        }
        for (let i = 1; i < 10; i++) { // 求尾坐标
            cnt[i] += cnt[i - 1];
        }
        for (let i = n - 1; i >= 0; i--) {
            let digit = Math.floor(nums[i] / exp) % 10;
            buf[cnt[digit] - 1] = nums[i];
            cnt[digit]--;
        }
        nums.splice(0, n, ...buf);
        exp *= 10;
    }
    
};



/**
 * 基数排序MSD是通过递归实现
 * @param {Number} arr 
 */
function radixSort_MSD(arr) {
    const max = Math.max(...arr).toString().length
    // 获取数字的某一位上的值
    function getDigit(num, digit) {
        return Math.floor((num % (10 ** digit)) / 10 ** (digit - 1));
    }
    const radixSortRecursive = (nums, digit) => {
        if (digit <= 0 || nums.length <= 1) return nums
        const buckets = Array.from({ length: 10 }, () => []) // 0-9的存储
        // 将数字分配到桶中
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            const digitValue = getDigit(num, digit);
            buckets[digitValue].push(num)
        }
        // 递归地对每个桶进行排序
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = radixSortRecursive(buckets[i], digit - 1)
        }
        // 合并排序后的桶
        return buckets.flat();
    }
    return radixSortRecursive(arr, max);
}

const arr = [10, 200, 91, 13, 12, 7, 88, 91, 24, 1000];
const arr2 = [10, 200, 91, 13, 12, 7, 88, 91, 24, 1000];

radixSort(arr);
console.log(arr);
console.log(radixSort_MSD(arr2));



