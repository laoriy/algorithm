# 二叉树

### 树基础知识：

1. 每个节点有多个指针域的称为树，或者可以认为链表是一种特殊的树形解构
2. 将链表的单个指针域改成数组，即为树
3. 每个节点都只有唯一的一个父节点。
4. 二叉树
   - 每个节点度最多为 2
   - 度为 0 的节点比度为 2 的节点多一个（n 个节点，会有 n-1 条边，点的数量 n0+ n1 + n2,边的数量 n1 + 2n2,即为 n0 = n2 + 1）
   - 重要遍历
     - 前序遍历：根左右
     - 中序遍历：左根右
     - 后序遍历：左右根
     - 中序遍历结果 + 前序/后序结果可以还原一颗二叉树
   - 分类
     - 完全二叉树：只有在最后一层的右侧是缺少节点的，左侧是满节点的
     - 满二叉树：没有度为 1 的节点，只有度为 0 或者度为 2 的节点。
     - 完美二叉树：深度为 k 的所有节点都满了。
   - 完全二叉树：
     1. 编号为`i`的子节点，左孩子编号为：`2i`，右孩子编号为 `2i + 1`
     2. 不需要存储 left，right 子树地址，可以节省存储空间。记录式（节省时间） --> 计算式（节省空间）
     3. 可以用连续空间存储（数组）

5. `二叉搜索树`是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树

### 树的深入理解：

1. 树的节点代表集合
2. 树的边代表关系

### 树实现

1. 见 index.js 生成长度为 n 的随机的二叉树。

### 树的作用

1. 它理解高级数据结构的基础
   ![image](./images/effect-1.jpg)
2. 练习递归技巧的最佳选择

   设计、理解递归程序

   1. 数学归纳法-> 结构归纳法
   2. 赋予递归函数一个明确的意义
   3. 思考边界条件
   4. 实现递归过程

      -------->

   二叉树的前序遍历：

   1. 函数意义：前序遍历以 root 为根结点的二叉树
   2. 边界条件，root 为空时不需要遍历
   3. 递归过程：前序遍历左子树，前序遍历右子树

3. 左孩子右兄弟表示法省空间，三叉树（多叉树）转二叉树，因为二叉树浪费的空指针域最少。n 个节点有 n-1 条边，k 叉树总边为 kn, 浪费的边为(k-1)n + 1;

### 经典面试题

144. 二叉树的前序遍历
145. N 叉树的前序遍历
146. 翻转二叉树
     剑指 Offer 32 - I. 从上到下打印二叉树
147. 二叉树的层序遍历 II
148. 二叉树的锯齿形层序遍历

### 进阶面试题

110. 平衡二叉树

```TS

function isBalanced(root: TreeNode | null): boolean {
    const res = {
        isB:true,
    }
   getHeight(root, res)
   return res.isB
};
/**
    获取树高
 */
function getHeight(root: TreeNode | null, res){
    if(root === null) return 0
    let l = getHeight(root.left, res)
    let r = getHeight(root.right, res)
    if(res.isB){
        res.isB = Math.abs(l-r) <= 1 // 是不是平衡
    }

    return Math.max(l,r) + 1
}
```

```TS
function isBalanced(root: TreeNode | null): boolean {
   return getHeight(root) >= 0
};
/**
    获取树高
 */
function getHeight(root: TreeNode | null){
    if(root === null) return 0
    let l = getHeight(root.left)
    let r = getHeight(root.right)

    if(l < 0 || r < 0)  return -2 // 不平衡
    if(Math.abs(l-r) > 1 ) return -2 // 不平衡
    return Math.max(l,r) + 1
}
```

112. 二叉树路径总和

```ts
// 只有left和right节点都为空，才校验是不是和targetSum相同
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === targetSum;
    if (root.left && hasPathSum(root.left, targetSum - root.val)) return true;
    if (root.right && hasPathSum(root.right, targetSum - root.val)) return true;
    return false;
}
```

```ts
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if(root === null) return false
    let res = false
    const  dfs = (root,sum) => {
        if(!root) return
        if(sum === targetSum && !root.left && !root.right){
            res = true
            return
        }
        if(root.left) dfs(root.left,sum + root.left.val)
        if(root.right) dfs(root.right,sum + root.right.val)
    }
    dfs(root, root.val)
    return res

};
```

105. 从前序与中序遍历序列构造二叉树
```js
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const len = preorder.length
    if(len === 0) return null
    let rootVal = preorder[0]
    let root = new TreeNode(rootVal)
    let rootIndex = 0;
    for(let i = 0;i< inorder.length;i++){
        if(inorder[i] === rootVal) {
            rootIndex = i
            break;
        } 
    }
    root.left = buildTree(preorder.slice(1,rootIndex + 1),inorder.slice(0,rootIndex))
    root.right = buildTree(preorder.slice(rootIndex + 1),inorder.slice(rootIndex + 1))
    return root
};
```

222. 完全二叉树的节点个数

```js
function countNodes(root: TreeNode | null): number {
    if(root === null) return 0
    return 1 + countNodes(root.left) + countNodes(root.right)
};
```

剑指 Offer 54. 二叉搜索树的第k大节点
- 根据二叉搜索树的特点，中序遍历结果就是一个有序的序列

```ts
function getNodeCount(root: TreeNode | null){
    if(root === null) return 0
    return getNodeCount(root.left) + getNodeCount(root.right) + 1
}

function kthLargest(root: TreeNode | null, k: number): number {
    const cnt_r = getNodeCount(root.right)
    if(k<=cnt_r) return kthLargest(root.right,k)
    if(k === cnt_r + 1) return root.val
    return kthLargest(root.left,k - cnt_r - 1)
};
```

剑指 Offer 26. 树的子结构

```ts
function isMatch(A: TreeNode | null, B: TreeNode | null){
    if(B === null) return true
    if(A === null) return false
    if(A.val !== B.val) return false
    return isMatch(A.left,B.left) && isMatch(A.right,B.right)
}

function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
    if(A == null || B == null) return false
    if(A.val === B.val && isMatch(A,B)) return true 
    return isSubStructure(A.left,B) ||isSubStructure(A.right,B)
};
```




### 进阶面试题

662. 二叉树的最大宽度

- 根据完全二叉树的特点，给定跟节点编号为0，依次计算出每个节点的编号
- 用一个栈存每行的节点及该节点的编号。再遍历得出这一行的l，r编号。
- 遍历完一行时通过l和r求出改行的宽度。
- 注意大数问题，


968. 监控二叉树
