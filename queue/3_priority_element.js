class HigherElementPriorityQueue {
  nums = [];
  constructor(arr) {
    // acending order
    this.nums = arr.sort((a, b) => a - b);
  }
  enqueue(element) {
    this.nums.push(element);
    this.nums.sort((a, b) => a - b);
  }
  dequeue() {
    return this.nums.pop();
  }
}

class LowerElementPriorityQueue {
  nums = [];
  constructor(arr) {
    // Decending order
    this.nums = arr.sort((a, b) => b - a);
  }
  enqueue(element) {
    this.nums.push(element);
    this.nums.sort((a, b) => b - a);
  }
  dequeue() {
    return this.nums.pop();
  }
}
