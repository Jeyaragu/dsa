function partition(arr, start = 0, end = arr.length - 1) {
  let pivot = arr[start];
  let pivotSwapIndex = start;
  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      pivotSwapIndex += 1;
      // Moving smaller elements towards pivot index
      [arr[pivotSwapIndex], arr[i]] = [arr[i], arr[pivotSwapIndex]];
    }
  }
  // Swapping the privot element to currect sorting place
  [arr[start], arr[pivotSwapIndex]] = [arr[pivotSwapIndex], arr[start]];
  return pivotSwapIndex;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    let pivotIndex = partition(arr, start, arr.length - 1); // Return the partitioning position of the element
    // Process Right sub-array
    quickSort(arr, start, pivotIndex - 1);
    // Process Left sub-array
    quickSort(arr, pivotIndex + 1, end);
  }
  return arr;
}

// console.log(quickSort([4, 8, 2, 1, 5, 7, 6, 3]));
console.log(quickSort([26, 23, 27, 44, 17, 27, 39, 42, 43, 1]));
