// Simple Queue
class Queue {
  queue = [];
  frontPointer = -1;
  rearPointer = -1;
  constructor() {}
  // Uses rear pointer to insert element from the back
  enqueue(element) {
    this.rearPointer += 1;
    this.queue[this.rearPointer] = element;
    return;
  }
  // In dequeue instead of removing element, we just using pointer to refer the element from the array.
  dequeue() {
    // this.queue.shift() - Time complexity will be O(n)
    if (this.isEmpty()) {
      return null;
    } else {
      this.frontPointer += 1;
      return this.queue[this.frontPointer];
    }
  }
  full() {
    return this.rearPointer === this.queue.length - 1;
  }
  isEmpty() {
    return this.frontPointer === this.rearPointer;
  }
}

// Hacker Rank -- simple queue
function processData(input) {
  const queue = [];
  let frontPointer = -1; // The front pointer stays before the first element.
  let rearPointer = -1; // The rear pointer indicates the last element.
  input = input.trim().split("\n");
  // Index 0 is length of the array so we are not considering Index 0
  for (let i = 1; i < input.length; i++) {
    const context = input[i].split(" ");
    const type = Number(context[0]);
    const element = Number(context[1]);
    if (type === 1) {
      rearPointer += 1;
      queue[rearPointer] = element;
    } else if (type === 2) {
      frontPointer += 1;
    } else {
      console.log(queue[frontPointer + 1]);
    }
  }
}

/**
 * 387. First Unique Character in a String
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const strMap = new Map();
  const strQueue = [];
  let frontPointer = 0;
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    strQueue.push(i);
    strMap.set(str, (strMap.get(str) || 0) + 1);
    while (strQueue.length > 0 && strMap.get(s[strQueue[frontPointer]]) > 1) {
      frontPointer += 1;
    }
  }
  return strQueue.length === frontPointer ? -1 : strQueue[frontPointer];
};
// Simple Queue using two stacks.
// class MyQueue {
//   primaryStack: number[] = [];
//   secondaryStack: number[] = [];
//   constructor() {}

//   push(x: number): void {
//     // Pushing element to the primary stack
//     this.primaryStack.push(x);
//     console.log(this.primaryStack)
//   }

//   pop(): number {
//     // If secondary stack has value, removing last element from the secondary stack
//     if (this.secondaryStack.length) {
//       return this.secondaryStack.pop()!;
//     }
//     // Since primary stack having value we are shifting to secondary stack
//     while (this.primaryStack.length) {
//       this.secondaryStack.push(this.primaryStack.pop()!);
//     }
//     // After shifting removing last element from the stack. Basically this last element is first element pushed in primary stack
//     return this.secondaryStack.pop()!;
//   }

//   peek(): number {
//      if (this.secondaryStack.length) {
//       return this.secondaryStack.at(-1)!;
//     }
//     while(this.primaryStack.length) {
//         this.secondaryStack.push(this.primaryStack.pop()!)
//     }
//     return this.secondaryStack.at(-1)!;
//   }

//   empty(): boolean {
//     return this.primaryStack.length === 0 && this.secondaryStack.length === 0;
//   }
// }
