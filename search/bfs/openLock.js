const numPrev = (x) => x === '0' ? '9' : `${Number(x) - 1}`
const numNext = (x) => x === '9' ? '0' : `${Number(x) + 1}`

function getStatus(status) {
    const ret = []
    const array = Array.from(status);
    for (let i = 0; i < 4; i++) {
        const num = array[i]
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
    const queue = ['0000']
    let step = 0;
    while (queue.length) {
        step++;
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            const newStatus = getStatus(queue.shift())
            for (let status of newStatus) {
                if (!seen.has(status) && !dead.has(status)) { // 如果没有看过，且不是永久锁
                    if (status === target) return step;
                    seen.add(status);
                    queue.push(status)
                }
            }
        }
    }
    return -1
};

console.log(
    openLock(["0201", "0101", "0102", "1212", "2002"], "0202"),
    openLock(["8888"], "0009"),
    openLock(["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], "8888"),
)
