function calc(expression, left, right) {
    let op = -1
    let pri = 10000 - 1
    let cur_pri
    let temp = 0

    for (let i = left; i < right; i += 1) {
        cur_pri = 10000
        switch (expression[i]) {
            case '+':
            case '-':
                cur_pri = 1 + temp;
                break;
            case '*':
            case '/':
                cur_pri = 2 + temp
                break;

            case '(':
                temp += 100
                break;
            case ')':
                temp -= 100
                break;
        }
        if (cur_pri <= pri) {
            pri = cur_pri;
            op = i
        }
    }

    if (op === -1) {
        let num = 0;
        for (let i = left; i <= right; i++) {
            if (expression[i] < '0' || expression[i] > '9') continue;
            num = num * 10 + (expression[i] - '0')

        }
        return num
    }


    let a = calc(expression, left, op - 1)
    let b = calc(expression, op + 1, right)
    switch (expression[op]) {
        case '+': return a + b
        case '-': return a - b
        case '*': return a * b
        case '/': return a / b
    }
    return 0

}

/**
 * 
 * @param {String} expression 表达式
 */
function calculation(expression) {
    return calc(expression, 0, expression.length - 1)
}


console.log(calculation('3 * ( 4 + 5 )'));

console.log(calculation('3 * 4 + 5 * 6'));
