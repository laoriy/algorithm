function reversePairs(nums) {
    let count = 0;
    if (nums.length <= 1) return 0;
    const mergeSort = (left, right) => {
        if (left >= right) return;
        let mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);

        let p1 = left;
        let p2 = mid + 1;
        let temp = [];
        while (p1 <= mid && p2 <= right) {
            if (nums[p1] <= nums[p2]) {
                temp.push(nums[p1++]);
            } else {
                // 左边大于右边
                temp.push(nums[p2++]);
                count += (mid + 1 - p1); // 左边剩下的都比右边大 ，即都是逆序对
            }
        }

        if (p1 <= mid) temp.push(...nums.slice(p1, mid + 1));
        if (p2 <= right) temp.push(...nums.slice(p2, right + 1))

        for (let i = 0; i < temp.length; i++) nums[left + i] = temp[i];
    };
    mergeSort(0, nums.length - 1);
    return count;
}

console.log(reversePairs([7, 5, 6, 4]));
console.log(reversePairs([4,5,6,7]));
