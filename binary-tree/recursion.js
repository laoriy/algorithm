/**
 * 第n项斐波那契数列的值
 */
function fib(n){
    if(n <=2 ) return n
    return fib(n - 1) + fib(n - 2)
}

/**
 * 数学归纳法
 * 1. 首先能确定边界k0正确 ，即n = 1 n = 2正确
 * 2. 假设ki 正确，即fib(n - 1) fib(n - 2) 正确，则能推导出kn+i正确
 */


console.log(fib(1));
console.log(fib(2));
console.log(fib(3));
console.log(fib(4));
console.log(fib(5));
console.log(fib(6));