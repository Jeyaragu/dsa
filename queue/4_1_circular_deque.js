// Circular Deque
class MyCircularDeque {
  size = 0;
  queue = [];
  frontPointer = 0;
  rearPointer = 0;
  count = 0;

  constructor(k) {
    this.size = k;
    this.queue = new Array(k);
  }
  //Here front pointer will decrease because here frontPointer used for adding the element from front, so the module condition will be -1
  insertFront(value) {
    if (this.isFull()) return false;
    this.frontPointer = (this.frontPointer - 1 + this.size) % this.size;
    this.queue[this.frontPointer] = value;
    this.count++;
    return true;
  }
  // Here rearPointer will increase since rearPointer used to add the element to the queue as per the queue behaviour so the modulo condition will be +1
  insertLast(value) {
    if (this.isFull()) return false;
    this.queue[this.rearPointer] = value;
    this.rearPointer = (this.rearPointer + 1) % this.size;
    this.count++;
    return true;
  }
  // Here frontPointer will increase because frontPointer used to remove the element from array as per the queue behavious. So the modulo condition will be +1
  deleteFront() {
    if (this.isEmpty()) return false;
    this.frontPointer = (this.frontPointer + 1) % this.size;
    this.count--;
    return true;
  }
  //   Here rearPointer will decrease because rearPointer used to deleting the element so the modulo condition will be -1
  deleteLast() {
    if (this.isEmpty()) return false;
    this.rearPointer = (this.rearPointer - 1 + this.size) % this.size;
    this.count--;
    return true;
  }

  getFront() {
    if (this.isEmpty()) return -1;
    return this.queue[this.frontPointer];
  }

  getRear() {
    if (this.isEmpty()) return -1;
    return this.queue[(this.rearPointer - 1 + this.size) % this.size];
  }

  isEmpty() {
    return this.count === 0;
  }

  isFull() {
    return this.count === this.size;
  }
}
