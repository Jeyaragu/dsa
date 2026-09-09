// Definition for singly-linked list.
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 19. Remove Nth Node From End of List
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
function removeNthFromEnd(head, n) {
  var fastPointer = this.head;
  for (let i = 0; i < n; i++) {
    fastPointer = fastPointer.next;
  }
  if (fastPointer === null) {
    return this.head.next;
  }
  var slowPointer = this.head;
  while (fastPointer && fastPointer.next !== null) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next;
  }
  const removeNode = slowPointer.next;
  if (removeNode) {
    slowPointer.next = removeNode.next;
    return this;
  }
  return null;
}

/**
 * 143. Reorder List
 * Queue, two pointers
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {};

/**
 * 203. Remove Linked List Elements
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  var newHead = head;
  let currentNode = newHead; // Duplicate the  newHead
  let previousNode = null; // It will matain the previous value of the current node
  while (currentNode) {
    if (currentNode.val === val) {
      let removeNode = currentNode;
      if (previousNode) {
        previousNode.next = removeNode.next; // Removing matched node from the list
      } else {
        // Since no previous value, so the matched value will from head.
        newHead = newHead.next;
      }
    } else {
      previousNode = currentNode;
    }
    currentNode = currentNode.next;
  }
  return newHead;
};

/**
 * 206. Reverse Linked List
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  var duplicateHead = head;
  var previousNode = null;
  var nextNode = null;
  while (duplicateHead) {
    nextNode = duplicateHead.next;
    duplicateHead.next = previousNode;
    previousNode = duplicateHead;
    duplicateHead = nextNode;
  }
  head = previousNode;
  return head;
};

/**
 * 237. Delete Node in a Linked List
 * In this problem we are not delete the node, instead of replacing the next value and pointer from the previous node
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
