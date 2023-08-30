class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(list1:ListNode, list2:ListNode) {
    let dummy = new ListNode() // 哨兵节点
    let cur = dummy
    while(list1 && list2){
        if(list1.val < list2.val){
            cur.next = list1
            list1 = list1.next
        } else {
            cur.next = list2
            list2 = list2.next
        }
        cur = cur.next
    }
    if(list1) cur.next = list1
    if(list2) cur.next = list2
    return dummy.next
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    // 合并第i到j个。
  function dfs(i, j) {
    if (i > j) return null;
    if (i === j) return lists[i]; // 不用合并
    let mid = Math.floor((j + i) / 2);
    const left = dfs(i, mid); // 左边合并后的
    const right = dfs(mid + 1, j); // 右边合并后的
    return mergeTwoLists(left, right); // 合并左右
  }
  return dfs(0, lists.length - 1);
}
