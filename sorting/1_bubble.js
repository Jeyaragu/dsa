function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let nowSwap = true;
    for (let j = 0; j <= i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        nowSwap = false;
      }
    }
    // Breaking the loop if there is no swap happend in the inner loop
    // It mean data sorted completely
    if (nowSwap) break;
  }
  return arr;
}
console.log(bubbleSort([5, 10, 20, 2, 2]));
