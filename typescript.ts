class MyCircularDeque {
  size: number = 0;
  queue: number[] = [];
  frontPointer: number = 0;
  rearPointer: number = 0;
  count: number = 0;

  constructor(k: number) {
    this.size = k;
    this.queue = new Array(k);
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false;
    this.frontPointer = (this.frontPointer - 1 + this.size) % this.size;
    this.queue[this.frontPointer] = value;
    this.count++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false;
    this.queue[this.rearPointer] = value;
    this.rearPointer = (this.rearPointer + 1) % this.size;
    this.count++;
    return true;
  }

  deleteFront(): boolean {
    if (this.isEmpty()) return false;

    this.frontPointer = (this.frontPointer + 1) % this.size;
    this.count--;

    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false;
    this.rearPointer = (this.rearPointer - 1 + this.size) % this.size;
    this.count--;
    return true;
  }

  getFront(): number {
    if (this.isEmpty()) return -1;
    return this.queue[this.frontPointer];
  }

  getRear(): number {
    if (this.isEmpty()) return -1;
    return this.queue[(this.rearPointer - 1 + this.size) % this.size];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.size;
  }
}