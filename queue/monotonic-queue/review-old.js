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

/**
 * 1760. 袋子里最少数目的球 -- 题目没太看明白，看了官方题解
 */

function minimumSize(nums, maxOperations) {
    let left = 1, right = _.max(nums);
    let ans = 0;
    while (left <= right) {
        const y = Math.floor((left + right) / 2);
        let ops = 0;
        for (const x of nums) {
            ops += Math.floor((x - 1) / y);
        }
        if (ops <= maxOperations) {
            ans = y;
            right = y - 1;
        } else {
            left = y + 1;
        }
    }
    return ans;

};

/**
 * 45. 跳跃游戏 II
给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。

每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:

0 <= j <= nums[i] 
i + j < n
返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。

 

示例 1:

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
示例 2:

输入: nums = [2,3,0,1,4]
输出: 2
 
 */

function jump(nums) {
    // 每次尽可能的往远的跳，每次最远的位置对应的数值  可以找到指向下一次可以跳到的范围，再在这个范围内寻找该范围内可以跳的最远的位置
    let cur = 0 // 当前位置
    let ans = 0
    let end = 1

    while (end < nums.length) {
        let next = []
        for (let i = cur; i < end; i++) {
            (nums[i] + i) && next.push(nums[i] + i)
        }
        cur = end
        end = Math.max(...next) + 1
        ans++
    }

    return ans;
};

function jump2(nums) {
    let maxPos = 0 // 当前位置
    let ans = 0
    let end = 0

    for (let i = 0; i < nums.length - 1; i++) {
        maxPos = Math.max(maxPos, i + nums[i])
        if (i === end) {
            end = maxPos
            ans++
        }
    }

    return ans;
};

console.log(
    jump([2, 3, 1, 1, 4]),
    jump([2, 3, 0, 1, 4]),
    jump([0]),
    jump([1, 2]),
    '--------> optimize',
    jump2([2, 3, 1, 1, 4]),
    jump2([2, 3, 0, 1, 4]),
    jump2([0]),
    jump2([1, 2])
);


/**
 * 93. 复原 IP 地址
 * 
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

 

示例 1：

输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
示例 2：

输入：s = "0000"
输出：["0.0.0.0"]
示例 3：

输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 */

/**
 * Generate all possible valid IP addresses from given string.
 *
 * @param {string} s - the input string
 * @return {string[]} an array of all valid IP addresses
 */
function restoreIpAddresses(s) {
    // pointId 属于 0 - 3
    const result = []
    const segments = new Array(4);
    function dfs(segmentId, start) {
        // 搜索到第四段了，如果这时候刚好也结束了，就加入结果数组
        if (segmentId === 4) {
            if (start === s.length) {
                result.push(segments.join('.'))
            }
            return
        }
        if (start === s.length) return;

        if (s[start] === '0') { // 这一位是0，
            segments[segmentId] = 0
            dfs(segmentId + 1, start + 1)
            return
        }
        // 一般情况，枚举每一种可能性并递归
        for (let i = start; i < s.length; i++) {
            let v = Number(s.slice(start, i + 1))
            if (v > 0 && v <= 255) {
                segments[segmentId] = v;
                dfs(segmentId + 1, i + 1)
            } else {
                break;
            }
        }

    }
    dfs(0, 0)
    return result
};

console.log(
    restoreIpAddresses('0000'),
    restoreIpAddresses('25525511135'),
)


/**
 * 46. 全排列

给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]
 */

/**
 * Generate all possible permutations of an array of numbers.
 *
 * @param {number[]} nums - The array of numbers to permute
 * @return {number[][]} An array of all possible permutations
 */
function permute(nums) {
    const result = []
    const usedMap = new Map()
    function dfs(path) {
        if (path.length === nums.length) {
            result.push(path.slice())
            return
        }

        for (let i = 0; i < nums.length; i++) {
            if (usedMap.has(nums[i])) continue;
            path.push(nums[i])
            usedMap.set(nums[i], true)
            dfs(path)
            path.pop()
            usedMap.delete(nums[i])
        }

    }
    dfs([])
    return result;
};

console.log(
    permute([1, 2, 3])
)
/**
 * 43. 字符串相乘
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

示例 1:

输入: num1 = "2", num2 = "3"
输出: "6"
示例 2:

输入: num1 = "123", num2 = "456"
输出: "56088"
 *
 * @param {string} num1 - the first number to multiply
 * @param {string} num2 - the second number to multiply
 * @return {string} the result of multiplying num1 and num2
 */
function multiply(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0'
    let arr1 = num1.split('')
    let arr2 = num2.split('')
    let result = ''
    let n1 = arr1.length, n2 = arr2.length;

    for (let i = n1 - 1; i >= 0; i--) {
        let add = 0 // 这是进位
        let res = '0'.repeat(n1 - i - 1) // 存放每一位计算后对应的值的字符串，记得补零
        for (let j = n2 - 1; j >= 0; j--) {
            let p = (arr2[j] * arr1[i]) + add
            res = `${p % 10}` + res
            add = Math.floor(p / 10)
        }
        if (add) res = add + res
        console.log(res);
        result = stringAdd(result, res)
    }

    return result
};

function stringAdd(str1, str2) {
    let maxLen = Math.max(str1.length, str2.length)
    str1 = str1.padStart(maxLen,'0')
    str2 = str2.padStart(maxLen,'0')
    let result = '', add = 0;
    for (let i = maxLen - 1; i >= 0; i--) {
        let sum = (+str1[i] || 0) + (+str2[i] || 0) + add
        result = `${sum % 10}` + result
        add = Math.floor(sum / 10)
    }
    if (add) result = add + result
    return result
}

console.log(
    multiply('123', '456'),
    multiply('2', '6'),
    multiply('98', '9'),

)