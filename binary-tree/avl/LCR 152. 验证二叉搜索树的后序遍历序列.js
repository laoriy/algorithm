/**
 * 请实现一个函数来判断整数数组 postorder 是否为二叉搜索树的后序遍历结果。
 */


/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyTreeOrder = function (postorder) {
    if (postorder.length === 0) return true
    function dfs(root, start, end) {
        if (!root || start > end) return true
        let midValue = root[end] // 中序遍历时中间的值，位于最后一位
        let idx = start
        while (root[idx] < midValue) {
            idx++
        }
        // 这时候index后面的按理都应该比midValue大，如果遇到一个小的，说明不是二叉搜索树
        for (let i = idx; i < end; i++) {
            if (root[i] < midValue) return false
        }

        if (!dfs(root, start, idx - 1)) return false
        if (!dfs(root, idx, end - 1)) return false

        return true
    }
    return dfs(postorder, 0, postorder.length - 1)

};

// console.log(verifyTreeOrder([4, 9, 6, 5, 8]));
console.log(verifyTreeOrder([4, 6, 5, 9, 8]));
