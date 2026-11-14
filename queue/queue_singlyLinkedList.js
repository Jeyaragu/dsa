class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

//  In Queue, Both enqueue and dequeue run in O(1) without the complexity of circular indexing.
// We maintain two pointers:
// head: points to the front of the queue (used for dequeue)
// tail: points to the rear of the queue (used for enqueue)
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    return ++this.size;
  }
  dequeue() {
    if (this.head === null) return null;
    const removeNode = this.head;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;
    this.size -= 1;
    return removeNode.data;
  }
}
