function moveZeroes(nums) {
  let zeroIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      if (zeroIndex !== i) {
        [nums[i], nums[zeroIndex]] = [nums[zeroIndex], nums[i]];
      }
      zeroIndex += 1;
    }
  }
  return nums;
}

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 1;
  let leftPointer = 0;
  for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
    if (nums[leftPointer] !== nums[rightPointer]) {
      leftPointer = rightPointer;
      k += 1;
    }
  }
  return k;
}

// console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]));

function shuffle(nums, n) {
  let rightPointer = n;
  let result = [];
  for (let leftPointer = 0; rightPointer < nums.length; leftPointer++) {
    result.push(nums[leftPointer]);
    result.push(nums[rightPointer]);
    rightPointer += 1;
  }
  return result;
}

// console.log(shuffle([1, 2, 3, 4, 4, 3, 2, 1], 4));

function removeElement(nums, val) {
  let count = 0;
  for (let pointer = 0; pointer < nums.length; pointer++) {
    if (nums[pointer] !== val) {
      count += 1;
    }
  }
  return count;
  // return nums.filter((n) => n !== val).length;
}

// console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));

// Input: Array of numbers in Increasing order. Keep only pair of values and remove duplicates.
// Return the number of pair elements
function keepPairOfElementAndDuplicates(nums) {
  if (nums.length <= 2) return nums.length;
  let leftPointer = 0;
  let k = nums.length;
  let count = 0;
  for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
    if (nums[leftPointer] !== nums[rightPointer] && count >= 2) {
      k -= count - 2;
      count = 1;
      leftPointer = rightPointer;
    } else if (nums[leftPointer] !== nums[rightPointer] && count < 2) {
      count = 1;
      leftPointer = rightPointer;
    } else {
      count += 1;
    }
  }
  if (count >= 2) {
    k -= count - 2;
  }
  return k;
}
// console.log(
//   keepPairOfElementAndDuplicates([
//     1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9,
//     9, 9, 10, 10, 10,
//   ]),
// );

// Following sliding window approach
function findMaxConsecutiveOnes(nums) {
  let maxCount = 0;
  let leftPointer = 0;
  let rightPointer = 0;
  while (rightPointer < nums.length) {
    if (nums[rightPointer] === 0) {
      rightPointer += 1;
      leftPointer = rightPointer;
    } else {
      maxCount = Math.max(maxCount, rightPointer - leftPointer + 1);
      rightPointer += 1;
    }
  }
  return maxCount;
}
// console.log(findMaxConsecutiveOnes([1,0,1,1,0,1]));
