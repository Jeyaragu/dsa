function binarySearch(arr, val) {
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  let middleIndex = rightPointer >> 1;
  while (arr[middleIndex] !== val && leftPointer <= rightPointer) {
    // Moving rightPointer towards midleIndex since val is small than middle
    if (arr[middleIndex] > val) rightPointer = middleIndex - 1;
    // Moving leftPointer towards middleIndex since val is larger than middle
    else leftPointer = middleIndex + 1;
    // Finally taking average of rightPointer and leftPointer
    middleIndex = (rightPointer + leftPointer) >> 1;
  }
  return arr[middleIndex] === val ? middleIndex : -1;
}
console.log(binarySearch([1, 1, 2], 2));
// console.log(binarySearch([1, 2, 3, 3, 4, 5, 6], 3));

function binarySearchString(arr, val) {
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  let middlePointer = rightPointer >> 1;
  while (arr[middlePointer] !== val && leftPointer < rightPointer) {
    if (val.localeCompare(arr[middlePointer]) > 0) {
      leftPointer = middlePointer + 1;
    } else {
      rightPointer = middlePointer - 1;
    }
    middlePointer = (rightPointer + leftPointer) >> 1;
  }
  return arr[middlePointer] === val ? middlePointer : -1;
}

// console.log(
//   binarySearchString(
//     ["apple", "ball", "cat", "device", "eight", "fox", "goal"],
//     "apple",
//   ),
// );
