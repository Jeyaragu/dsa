// Deque - One of the type in queue pattern
class Deque {
  queue = [];
  frontPointer = -1;
  rearPointer = -1;
  constructor() {}
  //  Inserting element at front without using negative index
  // If frontPointer is greater than rearPointer which mean queue is empty so we are reserting the queue
  enqueueFront(element) {
    // First element
    if (this.frontPointer === -1 || this.frontPointer > this.rearPointer) {
      this.frontPointer = 0;
      this.rearPointer = 0;
      this.queue[0] = element;
    }
    // Prevent going below index 0
    else if (this.frontPointer === 0) {
      return "No space at front";
    } else {
      // Here the frontPointer will point on the first element of the queue
      this.frontPointer -= 1;
      this.queue[this.frontPointer] = element;
    }
  }
  //  Insert at rear. If frontPointer is greater than rearPointer which mean queue is empty so we are reserting the queue
  enqueueRear(element) {
    if (this.rearPointer === -1 || this.frontPointer > this.rearPointer) {
      this.frontPointer = 0;
      this.rearPointer = 0;
      this.queue[0] = element;
    } else {
      this.rearPointer += 1;
      this.queue[this.rearPointer] = element;
    }
  }

  //  Remove from front
  dequeueFront() {
    // Empty Check
    if (this.frontPointer > this.rearPointer) {
      return null;
    }
    const value = this.queue[this.frontPointer];
    this.frontPointer += 1;
    return value;
  }

  // Remove from rear
  dequeueRear() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.queue[this.rearPointer];
    this.rearPointer -= 1;
    return value;
  }

  isFull() {
    return this.rearPointer === this.queue.length - 1;
  }
  isEmpty() {
    return this.frontPointer > this.rearPointer;
  }
}

// Decreasing monotonic queue - Input Restricted queue
// Data only inserted using rear pointer and removed using both front and rear pointers
// 239. Sliding Window Maximum - nums - Input array and k- window size
function maxSlidingWindow(nums, k) {
  let dequeue = [];
  let result = [];
  let frontPointer = 0; // Front Pointer will initialized with first element
  let rearPointer = -1; // Rear Pointer will stay before first element of the queue
  for (let i = 0; i < nums.length; i++) {
    // Remove the value those are out of the window
    while (dequeue[frontPointer] <= i - k) {
      frontPointer += 1;
    }
    // Removing the element those are greater than the previous element
    while (
      rearPointer >= frontPointer &&
      nums[dequeue[rearPointer]] < nums[i]
    ) {
      rearPointer -= 1;
    }
    rearPointer += 1;
    dequeue[rearPointer] = i;
    // Get value from the current window
    if (i - k + 1 >= 0) {
      const topElement = nums[dequeue[frontPointer]];
      result.push(topElement);
    }
  }
  return result;
}
// console.log(maxSlidingWindow([1, 3, -1, 4], 2));
// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

// Following approach using shift prototype method
// function maxSlidingWindow(nums, k) {
//   let dequeue = [];
//   let result = [];
//   for (let i = 0; i < nums.length; i++) {
//     // Remove the value those are out of the window
//     if (dequeue[0] <= i - k) {
//       // if (i + 1 - k > dequeue[0]) {
//       dequeue.shift();
//     }
//     // Once its reached checking greatest element in current element
//     while (dequeue.length > 0 && nums[dequeue.at(-1)] < nums[i]) {
//       dequeue.pop();
//     }
//     dequeue.push(i);
//     // Get value from the current window
//     if (i - k + 1 >= 0) {
//       const topElement = nums[dequeue[0]];
//       result.push(topElement);
//     }
//   }
//   return result;
// }

// Deque - One of the type in queue pattern
// class Deque {
//   queue = [];
//   frontPointer = -1;
//   rearPointer = -1;
//   constructor() {}
//   // Inserting element front of the array
//   enqueueFront(element) {
//     if (this.frontPointer !== -1) {
//       this.queue[this.frontPointer] = element;
//       this.frontPointer -= 1;
//       return "Added.!";
//     }
//     return "Unable to add since no space";
//   }
//   // Inserting element at the end of the array
//   enqueueRear(element) {
//     this.rearPointer += 1;
//     this.frontPointer += 1;
//     this.queue[this.rearPointer] = element;
//     return;
//   }
//   // Taking element from the front of the array.
//   dequeueFront() {
//     if (this.frontPointer >= this.rearPointer) {
//       return null;
//     } else {
//       this.frontPointer += 1;
//       return this.queue[this.frontPointer];
//     }
//   }
//   // Taking element at the end of the array
//   dequeueRear() {
//     if (this.frontPointer >= this.rearPointer) {
//       return null;
//     } else {
//       const rearElement = this.queue[this.rearPointer];
//       this.rearPointer -= 1;
//       return rearElement;
//     }
//   }
// }

// It follows monotonic increasing deque with input restricted queue.
// Finding the minimum values in a window
function minSlidingWindow(nums, k) {
  let dequeue = [];
  let result = [];
  let frontPointer = 0;
  let rearPointer = -1;
  for (let i = 0; i < nums.length; i++) {
    // Remove the value those are out of the window
    // If window size of top element is lessor than current window, moving front pointer +1. Since its a out off window.
    while (dequeue[frontPointer] <= i - k) {
      frontPointer += 1;
    }
    // Removing the element those are greater than the current element
    while (
      rearPointer >= frontPointer &&
      nums[dequeue[rearPointer]] > nums[i]
    ) {
      rearPointer -= 1;
    }
    rearPointer += 1;
    dequeue[rearPointer] = i;
    // Get value from the current window
    if (i - k + 1 >= 0) {
      const topElement = nums[dequeue[frontPointer]];
      result.push(topElement);
    }
  }
  return result;
}
// console.log(minSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));

// It using dobule dequeue logic
// 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
// nums - numbers and limit - difference limti
var longestSubarray = function (nums, limit) {
  let left = 0;
  let maxLen = 0;

  const maxDeque = [];
  let maxFrontPointer = 0;
  let maxRearPointer = -1;

  const minDeque = [];
  let minFrontPointer = 0;
  let minRearPointer = -1;

  for (let right = 0; right < nums.length; right++) {
    const currentElement = nums[right];
    // Decreasing Queue
    while (
      maxRearPointer >= maxFrontPointer &&
      nums[maxDeque[maxRearPointer]] < currentElement
    ) {
      maxRearPointer -= 1;
    }
    maxRearPointer += 1;
    maxDeque[maxRearPointer] = right;
    // Increasing dequeue
    while (
      minRearPointer >= minFrontPointer &&
      nums[minDeque[minRearPointer]] > currentElement
    ) {
      minRearPointer -= 1;
    }
    minRearPointer += 1;
    minDeque[minRearPointer] = right;

    // Comparing difference with limit and max and min values and shrinking the window
    while (
      nums[maxDeque[maxFrontPointer]] - nums[minDeque[minFrontPointer]] >
      limit
    ) {
      // Since window going to shrink, need to shrink the queues as well.
      // if the value of frontPointers are equal to left then it increase to 1
      maxDeque[maxFrontPointer] === left ? (maxFrontPointer += 1) : "";
      minDeque[minFrontPointer] === left ? (minFrontPointer += 1) : "";
      left += 1;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};
console.log(longestSubarray([4, 2, 2, 2, 4, 4, 2, 2], 0));

// var longestSubarray = function (nums, limit) {
//   let left = 0;
//   let maxLen = 0;
//   const deque = [];
//   let frontPointer = 0;
//   let rearPointer = -1;
//   for (let right = 0; right < nums.length; right++) {
//     const currentElement = nums[right];
//     if (deque.length === 0) {
//       deque[0] = right;
//       rearPointer += 1;
//     } else {
//       // Shrink Logic - The reason of using frontPointer because its a starting index of current window.
//       while (
//         rearPointer >= frontPointer &&
//         Math.abs(nums[deque[frontPointer]] - currentElement) > limit
//       ) {
//         frontPointer += 1;
//       }
//       maxLen = Math.max(maxLen, right - frontPointer + 1);
//       // Deque increasing queue - Comparing with last element (so using rearPointer) and updating queue
//       while (
//         rearPointer > frontPointer &&
//         nums[deque[rearPointer]] > currentElement
//       ) {
//         rearPointer -= 1;
//       }
//       rearPointer += 1;
//       deque[rearPointer] = right;
//     }
//   }
//   return maxLen;
// };
