/**
 * 递增栈
 */
function monotonicStack(arr) {
    let n = 0
    const stack = []
    const next = [] // n后面最近的比他小的数
    const pre = [] // n前面最近的比他小的数
    while(n < arr.length){
        while(stack.length && arr[stack[stack.length - 1]] > arr[n]){
            next[stack.pop()] = n // 栈顶元素所在位置后面最近的比他小的数为n
        }
        if(stack.length === 0){
            pre[n] = -1
        }else{
            pre[n] = stack[stack.length - 1]
        }
        stack.push(n)

        n++
    }

    while(stack.length) next[stack.pop()] = n // 栈里面的元素没有比他小的数，所以假设一个虚拟位置n，和前面没有假设为-1一样

    console.log(pre,next);
}

monotonicStack([6,7,9,0,8,3,4,5,1,2])