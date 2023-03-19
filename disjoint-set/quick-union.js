// quick-union

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
/**
 * 按秩合并优化
 */
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
        // 按秩合并
        if (this.level[fa] < this.level[fb]) {
            this.parent[fa] = fb // fb作为爸爸
            this.level[fb] += this.level[fa]
        } else {
            this.parent[fb] = fa // fb作为爸爸
            this.level[fa] += this.level[fb]
        }
    }
}

/**
 * 路径压缩
 */

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
        this.parent[x] = root // 将x的父级直接指向跟
        return root;
    }

    merge(a, b) {
        let fa = this.find(a)
        let fb = this.find(b)

        if (fa === fb) return;

        this.parent[fa] = fb
    }
}