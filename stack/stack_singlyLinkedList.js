class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

// In stack, insert and remove always constant time so, The head of the linked list represents the top of the stack.Push means inserting a new node to the head. Pop means removing the node from the head.
class Stack {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  push(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    return ++this.size;
  }
  pop() {
    if (this.head === null) return null;
    const removeNode = this.head;
    this.head = this.head.next;
    removeNode.next = null;
    this.size -= 1;
    return removeNode.data;
  }
}
