## 温故知新

- 491. 递增子序列
```ts
function findSubsequences(nums: number[]): number[][] {
    const result = []

    function getResult(nums:number[],startIndex:number,route:number[]){
        let length = nums.length;
        if(route.length >= 2) {
            result.push(route.slice())
        }

        const usedSet = new Set()

        for(let i = startIndex; i <length; i++){
            if(nums[i] < route[route.length - 1] || usedSet.has(nums[i])) continue;

            usedSet.add(nums[i])
            route.push(nums[i])
            getResult(nums, i + 1, route);
            route.pop()
        }
    }

    getResult(nums,0,[])

    return  result
};
```
- 面试题 04.12. 求和路径
```ts
function pathSum(root: TreeNode | null, sum: number): number {
    // 已root 为 起点，满足路径和为sum的路径数目
    function rootSum(root: TreeNode | null, sum:number){
       if(!root) return 0
       const val = sum - root.val
       return (root.val === sum) + rootSum(root.left,val) + rootSum(root.right,val)
    }
    if(!root) return 0
    
    let ret = rootSum(root, sum);
    // 递归所有节点，以每个节点为起点进行递归然后加到一起
    ret += pathSum(root.left, sum);
    ret += pathSum(root.right, sum);
    return ret;

};
```