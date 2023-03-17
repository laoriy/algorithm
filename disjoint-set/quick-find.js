// quick-find

class QuickFind {
    color = []
    size = 0
    constructor(n){
        this.size = n
        for(let i = 0 ;i<n;i++){
            this.color[i] = i
        }
    }
    // 时间复杂度O(1)
    // 第x个点的颜色
    find(x){
        return this.color[x]
    }
    // 时间复杂度O(n)
    merge(a,b){
        const cb = this.color[b]
        // 将b的颜色赋值给a
        for(let i = 0 ;i < this.size;i++){
           if(this.color[i] = cb) this.color[i] = this.color[a] 
        }
    }
}