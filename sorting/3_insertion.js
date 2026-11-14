function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i - 1; // Need to compare with previous value
    while (j >= 0 && arr[j] > current) {
    //   arr[j + 1] = arr[j]; // Moving arr[j] to next index since its larger
      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Moving arr[j] to next index since its larger
      j -= 1;
    }
    // arr[j + 1] = current;
  }
  return arr;
}
console.log(insertionSort([5, 10, 20, 1, 2]));

// My version
// function insertionSort(arr) {
//   for (let i = 0; i < arr.length - 1; i++) {
//     if (arr[i] > arr[i + 1]) {
//       let temp = i;
//       let j = i + 1;
//       while (temp >= 0) {
//         if (arr[temp] > arr[j]) {
//           [arr[temp], arr[j]] = [arr[j], arr[temp]];
//           j = temp;
//           temp -= 1;
//         } else break;
//       }
//     }
//   }
//   return arr;
// }
