/* 设计一个基于时间的键值数据结构，该结构可以在不同时间戳存储对应同一个键的多个值，并针对特定时间戳检索键对应的值。

实现 TimeMap 类：

TimeMap() 初始化数据结构对象
void set(String key, String value, int timestamp) 存储给定时间戳 timestamp 时的键 key 和值 value。
String get(String key, int timestamp) 返回一个值，该值在之前调用了 set，其中 timestamp_prev <= timestamp 。如果有多个这样的值，它将返回与最大  timestamp_prev 关联的值。如果没有值，则返回空字符串（""）。
 
示例 1：

输入：
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
输出：
[null, null, "bar", "bar", null, "bar2", "bar2"]

解释：
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // 存储键 "foo" 和值 "bar" ，时间戳 timestamp = 1   
timeMap.get("foo", 1);         // 返回 "bar"
timeMap.get("foo", 3);         // 返回 "bar", 因为在时间戳 3 和时间戳 2 处没有对应 "foo" 的值，所以唯一的值位于时间戳 1 处（即 "bar"） 。
timeMap.set("foo", "bar2", 4); // 存储键 "foo" 和值 "bar2" ，时间戳 timestamp = 4  
timeMap.get("foo", 4);         // 返回 "bar2"
timeMap.get("foo", 5);         // 返回 "bar2" */



var TimeMap = function () {
    this.map = new Map()
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
    const v = this.map.get(key)
    if (v) {
        v.push({
            value: value,
            timestamp: timestamp
        })
    } else {
        this.map.set(key, [{
            value: value,
            timestamp: timestamp
        }])
    }
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
    let arr = this.map.get(key)

    if (!arr) return ''
    
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        const mid = Math.floor((right + left) / 2)
        if (arr[mid].timestamp < timestamp) {
            left = mid + 1
        } else if (arr[mid].timestamp > timestamp) {
            right = mid - 1
        } else {
            return arr[mid].value
        }
    }
    if (right >= 0) {
        return arr[right].value
    }
    return ''
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
const obj = new TimeMap()
obj.set("foo", "bar", 1)
console.log(obj.get("foo", 1))
console.log(obj.get("foo", 3))
obj.set("foo", "bar2", 4)
console.log(obj.get("foo", 4))
console.log(obj.get("foo", 5))



