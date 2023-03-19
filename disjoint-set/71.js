// quick-find

class QuickFind {
    color = []
    size = 0
    constructor(n) {
        this.size = n
        for (let i = 0; i < n; i++) {
            this.color[i] = i
        }
    }
    // 时间复杂度O(1)
    // 第x个点的颜色
    find(x) {
        return this.color[x]
    }
    // 时间复杂度O(n)
    merge(a, b) {
        const cb = this.color[b]
        // 将b的颜色赋值给a
        for (let i = 0; i < this.size; i++) {
            if (this.color[i] === cb) this.color[i] = this.color[a]
        }
    }
}

class QuickUnion {
    parent = [] // 某个节点的父级
    constructor(n) {
        this.size = n
        for (let i = 0; i < n; i++) {
            this.parent[i] = i
        }
    }

    find(x) {
        if (this.parent[x] === x) return x  // 它自己 
        return this.find(this.parent[x])
    }

    merge(a, b) {
        let fa = this.find(a)
        let fb = this.find(b)

        if (fa === fb) return;

        this.parent[fa] = fb
        return;
    }
}

class WeightedQuickUnion {
    parent = [] // 某个节点的父级
    level = []
    constructor(n) {
        this.size = n
        for (let i = 0; i < n; i++) {
            this.parent[i] = i
            this.level[i] = i
        }
    }

    find(x) {
        if (this.parent[x] === x) return x  // 它自己 
        return this.find(this.parent[x])
    }

    merge(a, b) {
        let fa = this.find(a) // a的根节点
        let fb = this.find(b) // b的根节点

        if (fa === fb) return; // 在同一个集合，不用重复优化
        if (this.level[fa] < this.level[fb]) {
            this.parent[fa] = fb // fb作为爸爸
            this.level[fb] += this.level[fa]
        } else {
            this.parent[fb] = fa // fb作为爸爸
            this.level[fa] += this.level[fb]
        }
    }
}

class PathCompressionQuickUnion {
    parent = [] // 某个节点的父级
    constructor(n) {
        this.size = n
        for (let i = 0; i < n; i++) {
            this.parent[i] = i
        }
    }

    find(x) {
        if (this.parent[x] === x) return x  // 它自己 
        let root = this.find(this.parent[x])
        this.parent[x] = root
        return root;
    }

    merge(a, b) {
        let fa = this.find(a)
        let fb = this.find(b)

        if (fa === fb) return;

        this.parent[fa] = fb
    }
}

class UnionSet {
    father = []
    constructor(n) {
        for (let i = 0; i < n; i++) {
            this.father[i] = i;
        }
    }
    // 带路径压缩
    find(x) {
        return this.father[x] = (this.father[x] === x ? x : this.find(this.father[x]))
    }

    merge(a, b) {
        return this.father[this.find(a)] = this.find(b)
    }
}

function pengyouquan(n, m) {
    let u = new UnionSet(n)
    for (let i = 0; i < m.length; i++) {
        let [a, b, c] = m[i]
        switch (a) {
            case 1: u.merge(b, c); console.log('merge'); break;
            case 2:
                if (u.find(b) === u.find(c)) {
                    console.log(`${b}和${c}` + 'Yes');
                } else {
                    console.log(`${b}和${c}` + 'NOoo');
                }
        }
    }
    // console.log(u.color)
    console.log(u.parent)
}






pengyouquan(6, [
    [1, 1, 2],
    [2, 1, 3],
    [1, 2, 4],
    [1, 4, 3],
    [2, 1, 3],
])