function linearSearch(arr, val) {
  for (const index in arr) {
    if (arr[index] === val) {
      return parseInt(index);
    }
  }
  return -1;
}

// console.log(linearSearch([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 4));
