/**
 *  暴力匹配
 *  m 里面 查找n 字符串
 */

function bf(m, n) {
    let ans = -1;
    function match(m, p, n) {
        if (m.length - p < n.length) return false;
        for (let i = 0; i < n.length; i++) {
            if (m[p + i] !== n[i]) return false;
        }
        return true;
    }

    for (let i = 0; i < m.length; i++) {
        const isMatch = match(m, i, n);
        if (isMatch) return i;
    }

    return ans;
}


function buildPrefixTable(pattern) {
    const prefix = new Array(pattern.length).fill(0);
    let j = 0;
    for (let i = 1; i < pattern.length; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = prefix[j - 1];
        }
        if (pattern[i] === pattern[j]) {
            j++;
        }
        prefix[i] = j;
    }
    return prefix;
}

/**
 * kmp
 */

function kmp(m, n) {
    const prefixTable = buildPrefixTable(n)
    let j = 0;
    for (let i = 0; i < m.length; i++) {
        while (j > 0 && m[i] !== n[j]) {
            j = prefixTable[j - 1];
        }
        if (m[i] === n[j]) {
            j++;
        }
        if (j === n.length) {
            return i - n.length + 1;
        }
    }
    return -1;
}



/**
 * sunday
 */


function sunday(m, n) {
    const lastPosition = new Map();
    // 记录模式串每个字符最后出现的位置
    for (let i = 0; i < n.length; i++) {
        lastPosition.set(n[i], i);
    }

    for (let i = 0; i < m.length;) {
        let j = 0;
        while (j < n.length && n[j] === m[i + j]) {
            j++
        }
        if (j === n.length) {
            return i;
        } else {
            // 获取参与匹配的母串的下一个字符
            const nextChar = m[i + n.length];
            // 查看该字符有没有在模式串中出现
            // 如果有，移动模式串到该字符最后出现的位置的下一个位置，否则移动模式串到模式串长度的下一个位置
            i += (n.length - (lastPosition.get(nextChar) || 0));
        }
    }
    return -1;
}

/**
 * shift-and
 */

function shiftAnd(m,n){
    
}


console.log(
    bf("mnomnopqrstuvwxyzvwxyzeemnopqrstuvw", "mnopqrstuvwxyz"),
    kmp('abcabcabc', 'abcabccd'),
    sunday("ohrwllo wsorld", "or"),
    sunday("mnomnopqrstuvwxyzvwxyzeemnopqrstuvw", "mnopqrstuvwxyz"),
);


