/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 513. 找树左下角的值 Find the value of the leftmost node in the bottom level of the binary tree.
 *
 * @param {TreeNode} root - The root node of the binary tree
 * @return {number} The value of the leftmost node in the bottom level
 */
function findBottomLeftValue(root) {
    let maxLevel = -1, result = 0
    function dfs(_root, level) {
        if (!_root) return
        if (maxLevel < level) result = _root.val  // 这一层已经有一个值了

        dfs(_root.left, level + 1)
        dfs(_root.right, level + 1)
    }

    dfs(root, 0)

    return result
};



/**
 * 
 * 135. 分发糖果

n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

示例 1：

输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
示例 2：

输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
 */

function candy(ratings) {
    const leftCandies = new Array(ratings.length).fill(1)
    const rightCandies = new Array(ratings.length).fill(1)
    for (let i = 0; i < ratings.length; i++) {
        let j = ratings.length - i - 1
        if (i > 0 && ratings[i] > ratings[i - 1]) {
            leftCandies[i] = leftCandies[i - 1] + 1
        }
        if (j < ratings.length - 1 && ratings[j] > ratings[j + 1]) {
            rightCandies[j] = rightCandies[j + 1] + 1
        }
    }
    let result = 0
    for (let i = 0; i < ratings.length; i++) {
        result += Math.max(leftCandies[i], rightCandies[i])
    }
    return result
};

console.log(
    candy([1, 0, 2]),
    candy([1, 2, 2]),
)
/* 有两个水壶，容量分别为 x 和 y 升。水的供应是无限的。确定是否有可能使用这两个壶准确得到 target 升。

你可以：

装满任意一个水壶
清空任意一个水壶
将水从一个水壶倒入另一个水壶，直到接水壶已满，或倒水壶已空。
 

示例 1: 

输入: x = 3,y = 5,target = 4
输出: true
解释：
按照以下步骤操作，以达到总共 4 升水：
1. 装满 5 升的水壶(0, 5)。
2. 把 5 升的水壶倒进 3 升的水壶，留下 2 升(3, 2)。
3. 倒空 3 升的水壶(0, 2)。
4. 把 2 升水从 5 升的水壶转移到 3 升的水壶(2, 0)。
5. 再次加满 5 升的水壶(2, 5)。
6. 从 5 升的水壶向 3 升的水壶倒水直到 3 升的水壶倒满。5 升的水壶里留下了 4 升水(3, 4)。
7. 倒空 3 升的水壶。现在，5 升的水壶里正好有 4 升水(0, 4)。
参考：来自著名的 "Die Hard"
示例 2:

输入: x = 2, y = 6, target = 5
输出: false
示例 3:

输入: x = 1, y = 2, target = 3
输出: true
解释：同时倒满两个水壶。现在两个水壶中水的总量等于 3。 */


function canMeasureWater(x, y, target) {

    const queue = [[0, 0]]

    const memo = new Set()

    const getHash = ([left, right]) => {
        return left + '.' + right
    }


    function bfs([left, right], queue) {
        //case1 : 左边的壶倒入右边的壶中，直直右边的倒满或者左边倒空
        const tryCleanLeft = Math.min(left, y - right)
        queue.push([left - tryCleanLeft, right + tryCleanLeft])
        //case2：右边的壶倒入左边的壶中，直直左边的倒满或者右边倒空
        const tryCleanRight = Math.min(x - left, right)
        queue.push([left + tryCleanRight, right - tryCleanRight])
        // case3:左边倒满
        queue.push([x, right])
        // case4:右边倒满
        queue.push([left, y])
        // case5:左边倒空
        queue.push([0, right])
        // case6:右边倒空
        queue.push([left, 0])
    }

    while (queue.length > 0) {
        const first = queue.shift()

        if (memo.has(getHash(first))) continue
        memo.add(getHash(first))
        const [left, right] = first

        if (left === target || right === target || left + right === target) return true
        bfs(first, queue)
    }

    return false
};

console.log(
    canMeasureWater(3, 5, 4),
    canMeasureWater(2, 6, 5),
    canMeasureWater(1, 2, 3),
)