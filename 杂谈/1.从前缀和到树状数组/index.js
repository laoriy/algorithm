
function lowbit(x) {
    return x & -x;
}
class BinaryIndexedTree {
    constructor(size) {
        this.size = size
        this.tree = new Array(size + 1).fill(0);
    }
    /**
     * 原单点位置index加上value
     */
    add(index, value) {
        while (index <= this.size) {
            this.tree[index] += value;
            index += lowbit(index);
        }
    }
    /**
     * 查询前index个元素的和
     */
    find(index) {
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= lowbit(index);
        }
        return sum;
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const tree = new BinaryIndexedTree(arr.length);
for (let i = 0; i < arr.length; i++) {
    tree.add(i + 1, arr[i]);
}
console.log(tree.find(5)); // 15
console.log(tree); // 15
