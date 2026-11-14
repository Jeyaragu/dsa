function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let smallestIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[smallestIndex] > arr[j]) {
        smallestIndex = j;
      }
    }
    if (i !== smallestIndex)
      [arr[i], arr[smallestIndex]] = [arr[smallestIndex], arr[i]];
  }
  return arr;
}

console.log(selectionSort([5, 10, 20, 1, 2]));
