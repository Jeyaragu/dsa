// Find the next smallest element on the right
// Apply the loop from top (right) of the arr so we need the future smallest element
// Keep smaller elements and remove all larger or equal elements
const increaseStackOnRight = (arr) => {
  const stack = [];
  const smallerElementOnRightMap = new Map();
  // We loop from right because we need smaller elements on the RIGHT
  for (let i = arr.length - 1; i >= 0; i--) {
    const currentElement = arr[i];
    let topElement = stack[stack.length - 1];
    while (stack.length > 0 && topElement >= currentElement) {
      stack.pop();
      topElement = stack[stack.length - 1];
    }
    if (stack.length === 0) {
      smallerElementOnRightMap.set(i, -1);
    } else {
      smallerElementOnRightMap.set(i, topElement);
    }
    stack.push(currentElement);
  }
  return smallerElementOnRightMap;
};

// console.log(increaseStackOnRight([7, 3, 5, 2, 6]));

// Find the next smaller element on left
// The loop should start from bottom(left) so we can know the before smallest element
// Idea is to remove the greater or equal element and keep the smaller elements in the stack
const increaseStackOnLeft = (arr) => {
  const stack = [];
  const smallerElementOnLeftMap = new Map();
  // Starting loop from bottom of stack we need to find the smaller elements towards left
  for (let i = 0; i < arr.length; i++) {
    const currentElement = arr[i];
    let topElement = stack[stack.length - 1];
    // Removing higher element from the stack and make sure that the elements are arranged in increasing order
    while (stack.length > 0 && topElement >= currentElement) {
      stack.pop();
      topElement = stack[stack.length - 1];
    }
    if (stack.length === 0) {
      smallerElementOnLeftMap.set(i, -1);
    } else {
      smallerElementOnLeftMap.set(i, topElement);
    }
    stack.push(currentElement);
  }
  return smallerElementOnLeftMap;
};

// console.log(increaseStackOnLeft([7, 3, 5, 2, 6]));

// 84. Largest Rectangle in Histogram
// https://medium.com/@devanshshah1309/largest-rectangle-in-histogram-explained-4b7ef7142c87
function largestRectangleArea(heights) {
  const stackIndices = [];
  let maxArea = 0;
  for (let i = 0; i <= heights.length; i++) {
    const currentHeight = heights[i] ?? 0;
    // Using increasing monotionic stack and arranging stack in increasing order
    // Removing only the greater values from the stack so the condition is topStack >  current Value
    while (
      stackIndices.length > 0 &&
      heights[stackIndices.at(-1)] > currentHeight
    ) {
      // Removing top element from the stack
      let topIndex = stackIndices.pop();
      let width = 1;
      if (stackIndices.length === 0) {
        width = i;
      } else {
        // Finding the maximum indicies to make the maximum rectangle.
        // Minuing current indices with top indices after the pop will get the distance
        // Width = distance between current index and previous smaller index
        width = i - stackIndices.at(-1) - 1;
        console.log("--top", i, heights[i], stackIndices.at(-1), width);
      }
      const area = heights[topIndex] * width;
      console.log(area, heights[topIndex], width);
      maxArea = Math.max(maxArea, area);
    }
    stackIndices.push(i);
  }
  return maxArea;
}
// console.log(largestRectangleArea([1, 3, 4, 2, 5, 4]));

function trap(height) {
  const stackIndices = [];
  let totalUnits = 0;
  // Using decreasing stack to identify boundaries because we know the next greater element towards right
  for (let i = 0; i < height.length; i++) {
    const currentHeight = height[i];
    while (
      stackIndices.length > 0 &&
      height[stackIndices.at(-1)] < currentHeight
    ) {
      const valleyIndex = stackIndices.pop();
      // Here, the width is nothing but distance between the boundaries
      let width = 0;
      // Water need to fill upto some height
      let waterHeight = 0;
      // If stackIndices is zero the default width and height will be 0. Since no value available to find width between two boundaries and Minimum height of two boundaries.
      if (stackIndices.length !== 0) {
        width = i - stackIndices.at(-1) - 1;
        waterHeight =
          Math.min(currentHeight, height[stackIndices.at(-1)]) -
          height[valleyIndex];
      }
      const water = width * waterHeight;
      totalUnits += water;
    }
    stackIndices.push(i);
  }
  return totalUnits;
}
// console.log(trap([3, 0, 2]));
