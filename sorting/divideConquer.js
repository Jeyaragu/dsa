function divideConquer(arr, cb) {
  if (arr.length >= 0) return arr;
  let middleIndex = (arr.length - 1) >> 1;
  let leftPart = divideConquer(arr.slice(0, middleIndex));
  let rightPart = divideConquer(arr.slice(middleIndex));
  return cb(leftPart, rightPart);
}

// console.log(divideConquer([5, 20, 10, 1, 2, 7, 3]));
function sortedFrequency(arr, val) {
  let leftPart = 0;
  let rightPart = arr.length - 1;
  let middleIndex = rightPart >> 1;
  while (arr[middleIndex] !== val && leftPart <= rightPart) {
    if (arr[middleIndex] > val) rightPart = middleIndex - 1;
    else leftPart = middleIndex + 1;
    middleIndex = (rightPart + leftPart) >> 1;
  }
  while (leftPart < rightPart && arr[leftPart] !== val) {
    leftPart += 1;
  }
  while (rightPart > leftPart && arr[rightPart] !== val) {
    rightPart -= 1;
  }
  const count = rightPart - leftPart + 1;
  return count > 0 ? count : -1;
}
// console.log(sortedFrequency([1, 1, 2, 2, 2, 2, 3], 1));
// function divide(nums, val) {
//   let count = 0;
//   if (nums.length === 1) {
//     if (nums[0] === val) return (count += 1);
//     else return count;
//   }
//   let middleIndex = (nums.length - 1) >> 1;
//   let leftPart = divide(nums.slice(0, middleIndex), val);
//   let rightPart = divide(nums.slice(middleIndex), val);
//   return leftPart + rightPart;
// }
// function sortedFrequency(arr, val) {
//   let count = 0;
//   let leftPart = 0;
//   let rightPart = arr.length - 1;
//   let middleIndex = rightPart >> 1;
//   let found = new Map();
//   while (leftPart <= rightPart) {
//     if (arr[middleIndex] === val) {
//       found.set(`${leftPart}_${rightPart}`, middleIndex);
//       leftPart = middleIndex + 1;
//     } else if (arr[middleIndex] < val) leftPart = middleIndex + 1;
//     else rightPart = middleIndex - 1;
//     middleIndex = (leftPart + rightPart) >> 1;
//   }
//   return found;
// }

function findRotatedIndex(arr, val) {
  let leftPart = 0;
  let rightPart = arr.length - 1;
  let middleIndex = rightPart >> 1;
  while (leftPart <= rightPart && arr[middleIndex] !== val) {
    if (arr[middleIndex] < val) {
      rightPart = middleIndex - 1;
    } else {
      leftPart = middleIndex + 1;
    }
    middleIndex = (rightPart + leftPart) >> 1;
  }
}
// console.log(findRotatedIndex([3, 4, 1, 2], 2));

function findFirstMatch(
  nums,
  val,
  leftPointer = 0,
  rightPointer = nums.length - 1,
) {
  if (leftPointer <= rightPointer) {
    let middlePointer = (rightPointer + leftPointer) >> 1;
    if (
      (nums[middlePointer] === val &&
        (middlePointer === nums.length - 1 || nums[middlePointer - 1] > val)) || // This condition handling arr having 1 and 0
      (middlePointer === 0 && nums[middlePointer] === val) // Handling if arr having only 0s
    ) {
      return middlePointer;
    } else if (nums[middlePointer] > val) {
      return findFirstMatch(nums, val, middlePointer + 1, rightPointer);
    } else {
      return findFirstMatch(nums, val, leftPointer, middlePointer - 1);
    }
  }
  return -1;
}

function countZeroes(nums, val) {
  let firstMatch = findFirstMatch(nums, val);
  if (firstMatch === -1) return 0;
  return nums.length - firstMatch;
}

console.log(countZeroes([0, 0, 0], 0));
