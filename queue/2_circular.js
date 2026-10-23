class CircularQueue {
  queue = [];
  frontPointer = 0; // The front Pointer always stay before of first element and it should be empty.
  rearPointer = 0; // The rear pointer points to last element
  size = 0;
  constructor(size) {
    this.size = size;
  }

  calculateMod(pointerValue) {
    return (pointerValue + 1) % this.size;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      return "Queue is full";
    } else {
      this.rearPointer = this.calculateMod(this.rearPointer);
      this.queue[this.rearPointer] = element;
      return;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    } else {
      const findNextPointer = this.calculateMod(this.frontPointer);
      const removedElement = this.queue[findNextPointer];
      this.frontPointer = findNextPointer;
      return removedElement;
    }
  }

  Front() {
    if (this.isEmpty()) {
      return -1;
    } else {
      return this.queue[this.calculateMod(this.frontPointer)];
    }
  }

  Rear() {
    if (this.isEmpty()) {
      return -1;
    } else {
      return this.queue[this.rearPointer];
    }
  }
  isEmpty() {
    return this.frontPointer === this.rearPointer;
  }
  isFull() {
    const getPointer = this.calculateMod(this.rearPointer);
    return getPointer === this.frontPointer;
  }
}

const cq = new CircularQueue(4);
cq.enqueue(10);
cq.enqueue(20);
cq.enqueue(30);
cq.dequeue();
cq.enqueue(40);

// 622. Design Circular Queue
// class MyCircularQueue {
//   queue: number[] = [];
//   size: number = 0;
//   frontPointer: number = 0;
//   rearPointer: number = 0;
//   count: number = 0; // Maintaining count here to reuse the empty slot
//   constructor(k: number) {
//     this.size = k;
//     this.queue = new Array(k);
//   }
//   calculateMod(pointerValue: number): number {
//     return (pointerValue + 1) % this.size;
//   }
//   enQueue(value: number): boolean {
//     if (this.count === this.size) {
//       return false;
//     } else {
//       this.rearPointer = this.calculateMod(this.rearPointer);
//       this.queue[this.rearPointer] = value;
//       this.count++;
//       return true;
//     }
//   }

//   deQueue(): boolean {
//     if (this.isEmpty()) {
//       return false;
//     } else {
//       const findNextIndex = this.calculateMod(this.frontPointer);
//       this.frontPointer = findNextIndex;
//       this.count -= 1;
//       return true;
//     }
//   }

//   Front(): number {
//     if (this.isEmpty()) {
//       return -1;
//     } else {
//       return this.queue[this.calculateMod(this.frontPointer)];
//     }
//   }

//   Rear(): number {
//     if (this.isEmpty()) {
//       return -1;
//     } else {
//       return this.queue[this.rearPointer];
//     }
//   }
//   // Checking the count is zero instead of checking front and rear pointers
//   isEmpty(): boolean {
//     return this.count === 0;
//     // return this.frontPointer === this.rearPointer;
//   }
//   // Here we are checking count of element and size of array is equal
//   isFull(): boolean {
//     return this.count === this.size;
//     // return this.calculateMod(this.rearPointer) === this.frontPointer;
//   }
// }

// const myCircularQueue = new MyCircularQueue(3);
// console.log(myCircularQueue.enQueue(1)); // return True
// console.log(myCircularQueue.enQueue(2)); // return True
// console.log(myCircularQueue.enQueue(3)); // return True
// console.log(myCircularQueue.enQueue(4)); // return False
// console.log(myCircularQueue.Rear()); // return 3
// console.log(myCircularQueue.isFull()); // return True
// console.log(myCircularQueue.deQueue()); // return True
// console.log(myCircularQueue.enQueue(4)); // return True
// console.log(myCircularQueue.Rear()); // return 4

