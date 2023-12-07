/**
 * 
 * @param {Array<number>} arr 数组
 * @param {number} x 要查找最后一个不大于x的值
 * @returns 
 */
function binarySearch10(arr,x){
    let startPin = 0

    let endPin = arr.length - 1

    while(startPin < endPin){
        let mid = Math.floor((startPin + endPin) / 2)
        if(arr[mid] > x) endPin = mid - 1
        else startPin = mid
    }
    return startPin
}

const arr = [5,7,9,9,9,10,10,11,15,20]

console.log(binarySearch10(arr,10)); // 最后一个不大于10的位置在6-->10
console.log(binarySearch10(arr,8)); // 第一个不大于8的位置在1-->7