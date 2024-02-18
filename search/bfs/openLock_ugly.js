


// 752. 打开转盘锁

/**
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
 */

/**
 * 根据status获取旋转一次后获得的枚举
 */

const numPrev = (x) => x === '0' ? '9' : `${Number(x) - 1}`
const numNext = (x) => x === '9' ? '0' : `${Number(x) + 1}`

function getStatus(status) {
    const ret = []
    const array = Array.from(status);
    for (let i = 0; i < 4; i++) {
        let num = array[i]
        array[i] = numPrev(num)
        ret.push(array.join(''))
        array[i] = numNext(num)
        ret.push(array.join(''))
        array[i] = num
    }
    return ret
}


function openLock(deadends, target) {
    if (target === '0000') return 0
    const dead = new Set(deadends)
    if (dead.has('0000')) return -1

    const seen = new Set() // 是否访问过
    seen.add('0000')
    const queue = [['0000']]
    let step = 0;
    while (queue.length) {
        step++;
        let newStatus = [] // 走一步能得到的所有结果
        for (let s of queue.shift()) {
            newStatus = newStatus.concat(getStatus(s))
        }
        const ret = [] // 最终没走过的合法的加入队列，作为基础再进行转动
        for (let status of newStatus) {
            if (!seen.has(status) && !dead.has(status)) { // 如果没有看过，且不是永久锁
                if (status === target) return step;
                seen.add(status);
                ret.push(status)
            }
        }
        ret.length && queue.push(ret)
    }
    return -1
};

console.log(
    openLock(["0201", "0101", "0102", "1212", "2002"], "0202"),
    openLock(["8888"], "0009"),
    openLock(["8887","8889","8878","8898","8788","8988","7888","9888"], "8888"),
)


