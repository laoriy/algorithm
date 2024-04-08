/**
 * 496. 下一个更大元素 I 
 */

/**
 * Finds the next greater element for each element in nums1 that exists in nums2.
 *
 * @param {number[]} nums1 - An array of numbers.
 * @param {number[]} nums2 - An array of numbers.
 * @return {number[]} An array of numbers representing the next greater element for each element in nums1 that exists in nums2. If there is no next greater element, -1 is returned for that element.
 */
function nextGreaterElement(nums1, nums2) {
    const stack = [] // 单调递减栈
    const next = {}

    for (let i = 0; i < nums2.length; i++) {
        while (stack.length && stack[stack.length - 1] < nums2[i]) {
            next[stack.pop()] = nums2[i]
        }
        stack.push(nums2[i])
    }
    for (let i = 0; i < nums1.length; i++) {
        nums1[i] = next[nums1[i]] ?? -1
    }

    return nums1
};