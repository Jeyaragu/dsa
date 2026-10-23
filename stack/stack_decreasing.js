// function isValid(s: string): boolean {
//   const stack: string[] = [];
//   const parentheseMap: { [key: string]: string } = {
//     ")": "(",
//     "}": "{",
//     "]": "[",
//   };
//   for (const char of s) {
//     if (char === "(" || char === "{" || char === "[") {
//       stack.push(char);
//     } else {
//       if (stack.length === 0) return false;
//       let getTop = stack.pop();
//       if (getTop !== parentheseMap[char]) return false;
//     }
//   }
//   return stack.length === 0;
// }
// // console.log(isValid("([)]"));

// // 155. Min Stack
// class MinStack {
//   stack: number[];
//   minStack: number[];
//   constructor() {
//     this.stack = [];
//     this.minStack = [];
//   }

//   push(val: number): void {
//     if (this.minStack.length === 0) {
//       this.minStack.push(val);
//     } else {
//       const getTop = this.minStack[this.minStack.length - 1];
//       this.minStack.push(Math.min(getTop, val));
//     }
//     this.stack.push(val);
//   }

//   pop(): void {
//     this.stack.pop();
//     this.minStack.pop();
//   }

//   top(): number {
//     return this.stack[this.stack.length - 1];
//   }

//   getMin(): number {
//     return this.minStack[this.minStack.length - 1];
//   }
// }

function removeDuplicates(str) {
  const stack = [];
  for (const char of str) {
    if (stack.length === 0) {
      stack.push(char);
    } else {
      const getTop = stack[stack.length - 1];
      if (char !== getTop) {
        stack.push(char);
      } else {
        stack.pop();
      }
    }
  }
  return stack.join("");
}
// console.log(removeDuplicates("abbaca"));

// Decreasing monotonic stack - 496. Next Greater Element I
function nextGreaterElement(nums1, nums2) {
  let stack = [];
  let stackMap = new Map();
  let result = [];
  // Starting the loop from left since we need find the future element
  for (let i = nums2.length - 1; i >= 0; i--) {
    if (stack.length === 0) {
      stack.push(nums2[i]);
      stackMap.set(nums2[i], -1);
    } else {
      let getTop = stack[stack.length - 1];
      while (getTop <= nums2[i]) {
        stack.pop();
        getTop = stack[stack.length - 1];
      }
      if (stack.length === 0) {
        stackMap.set(nums2[i], -1);
      } else {
        stackMap.set(nums2[i], getTop);
      }
      stack.push(nums2[i]);
    }
  }
  for (let j = 0; j < nums1.length; j++) {
    const currentVal = nums1[j];
    result.push(stackMap.get(currentVal));
  }
  return { result, stack, stackMap };
}

// console.log(nextGreaterElement([4, 1, 2], [6, 1, 5, 3, 4, 2]));

/**
 * Decreasing monotonic stack
 * 739. Daily Temperatures
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const stack = [];
  const result = new Array(temperatures.length).fill(0);
  for (let i = temperatures.length - 1; i >= 0; i--) {
    let getTopIndex = stack[stack.length - 1];
    while (stack.length > 0 && temperatures[getTopIndex] <= temperatures[i]) {
      stack.pop();
      getTopIndex = stack[stack.length - 1];
    }
    console.log("getTopIndex", getTopIndex, i, temperatures[i]);
    if (stack.length === 0) {
      result[i] = 0;
    } else {
      result[i] = getTopIndex - i;
    }
    stack.push(i);
  }
  return result;
};
// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); // 7

// Hackerrank
function equalStacks(h1, h2, h3) {
  // Write your code here
  let sumh1 = h1.reduce((a, b) => a + b);
  let sumh2 = h2.reduce((a, b) => a + b);
  let sumh3 = h3.reduce((a, b) => a + b);
  let i,
    j,
    k = 0;
  let done = false;
  while (!done) {
    if (sumh1 === sumh2 && sumh2 === sum3) {
      done = true;
      return sumh1;
    }
    if (sumh1 === 0 || sumh2 === 0 || sumh3 === 0) return 0;
    if (sumh1 > sumh2 && sumh1 > sumh3) {
      sumh1 -= h1[i];
      i += 1;
    } else if (sumh2 > sumh1 && sumh2 > sumh3) {
      sumh2 -= h2[j];
      j += 1;
    } else {
      sumh3 -= h3[k];
      k += 1;
    }
  }
}
// console.log(equalStacks([1, 2, 1, 1], [1, 1, 2], [1, 1]));

// HackerRank
function getMax(operations) {
  const stack = [];
  const maxValues = [];
  const maxResult = [];
  for (const op of operations) {
    const str = op.split(" ");
    const type = Number(str[0]);
    const element = Number(str[1]);
    switch (type) {
      // Add element to the stack
      case 1:
        stack.push(element);
        if (maxValues.length === 0) {
          maxValues.push(element);
        } else {
          maxValues.push(Math.max(element, maxValues.at(-1)));
        }
        break;
      // Remove top of the element from the stack.
      case 2:
        stack.pop();
        maxValues.pop();
        break;
      // Find max value from the max values stack.
      default:
        maxResult.push(maxValues.at(-1));
        break;
    }
  }
  return maxResult;
}

// console.log(getMax(["1 97", "3", "2", "1 20", "3"]));

// Decreasing monotonic stack - 901. Online Stock Span
// class StockSpanner {
//   stockList: number[] = [];
//   stack: number[] = [];

//   next(price: number): number {
//     let span: number = 0;
//     // Getting the top value
//     let getTop = this.stack[this.stack.length - 1];
//     while (this.stack.length > 0 && this.stockList[getTop] <= price) {
//       this.stack.pop();
//       getTop = this.stack[this.stack.length - 1];
//     }
//     // Current index of the price going to stay
//     const getStockListLength = this.stockList.length;
//     // Stack is empty and has no previous element so returning current index + 1. Also here current index also will be empty
//     if (this.stack.length === 0) {
//       span = getStockListLength + 1;
//     } else {
//       // Value of current index - nearest previous greater index will give the how far back I can go until I hit a greater price
//       span = getStockListLength - getTop;
//     }
//     this.stockList.push(price);
//     this.stack.push(getStockListLength);
//     return span;
//   }
// }

// const stock = new StockSpanner();
// stock.next(31);
// stock.next(41);
// stock.next(48);
// stock.next(59);
// stock.next(79);