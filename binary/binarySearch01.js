/**
 * 
 * @param {Array<number>} arr 数组
 * @param {number} x 要查找第一个大于等于x的值
 * @returns 
 */
function binarySearch01(arr,x){
    let startPin = 0

    let endPin = arr.length - 1

    while(startPin < endPin){
        let mid = Math.floor((startPin + endPin) / 2) // 尽量让mid靠左
        if(arr[mid] >= x) endPin = mid
        else startPin = mid + 1 
    }
    return startPin
}

const arr = [5,7,9,9,9,10,10,11,15,20]

console.log(binarySearch01(arr,10)); // 第一个大于等于10的位置在5-->10
console.log(binarySearch01(arr,12)); // 第一个大于等于12的位置在8-->15
console.log(binarySearch01([5,7,7,8,8,10],8)); // 3

