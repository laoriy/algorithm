/**
 * 
 * @param {Array<number>} arr 数组
 * @param {number} x 待查找的值 
 * @returns 
 */
function binarySearch(arr,x){
    let startPin = 0

    let endPin = arr.length - 1

    while(startPin <= endPin){
        let mid = Math.floor((startPin + endPin) / 2)
        if(x === arr[mid]) return mid
        if(x > arr[mid]) startPin = mid + 1
        if(x < arr[mid]) endPin = mid - 1
    }


    return -1
}

const arr = [1,3,5,7,9,11,30]

console.log(binarySearch(arr,11)); // 5