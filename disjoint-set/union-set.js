// 并查集模板
class UnionSet {
    father = []
    constructor(n) {
        for (let i = 0; i < n; i++) {
            this.father[i] = i;
        }
    }
    // 带路径压缩
    get(x) {
        return this.father[x] = (this.father[x] === x ? x : this.get(this.father[x]))
    }

    merge(a, b) {
        return this.father[this.get(a)] = this.get(b)
    }
}