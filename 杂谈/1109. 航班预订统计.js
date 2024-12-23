/**
 * 这里有 n 个航班，它们分别从 1 到 n 进行编号。

有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。

请你返回一个长度为 n 的数组 answer，里面的元素是每个航班预定的座位总数。

 

示例 1：

输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
输出：[10,55,45,25,25]
解释：
航班编号        1   2   3   4   5
预订记录 1 ：   10  10
预订记录 2 ：       20  20
预订记录 3 ：       25  25  25  25
总座位数：      10  55  45  25  25
因此，answer = [10,55,45,25,25]
示例 2：

输入：bookings = [[1,2,10],[2,2,15]], n = 2
输出：[10,25]
解释：
航班编号        1   2
预订记录 1 ：   10  10
预订记录 2 ：       15
总座位数：      10  25
因此，answer = [10,25]
 */

/**
 * 暴力解法
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
    const ans = new Array(n).fill(0);
    bookings.forEach(([firsti, lasti, seatsi]) => {
        while (firsti <= lasti) {
            ans[firsti - 1] += seatsi;
            firsti++;
        }
    })
    return ans
};

/**
 * 差分法
 * 差分数组的前缀和即为原数组，差分数组的定义为相邻两项的差值
 */

var corpFlightBookings = function (bookings, n) {

    const diff = new Array(n).fill(0); // 差分数组，原差值都为0
    for (let i = 0; i < bookings.length; i++) {
        const [firsti, lasti, seatsi] = bookings[i]; // firsti, lasti 的变化，会引起firsti - 1, lasti 的变化
        diff[firsti - 1] += seatsi;
        if (lasti < n) diff[lasti] -= seatsi;
    }
    const ans = [diff[0]]
    for (let i = 1; i < n; i++) {
        ans[i] = ans[i - 1] + diff[i];
    }
    return ans;
};


console.log(corpFlightBookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5)); // [10,55,45,25,25]
console.log(corpFlightBookings([[1, 2, 10], [2, 2, 15]], 2)); // [10,25]

