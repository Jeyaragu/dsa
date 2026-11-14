function divideConquer(arr) {
  if (arr.length <= 1) return arr;
  let middIndex = arr.length >> 1;
  let leftPart = divideConquer(arr.slice(0, middIndex));
  let rightPart = divideConquer(arr.slice(middIndex));
  return merge(leftPart, rightPart);
}

function merge(arr1, arr2) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i += 1;
    } else {
      result.push(arr2[j]);
      j += 1;
    }
  }
  // Taking remaining elements from arr1 if exist
  while (i < arr1.length) {
    result.push(arr1[i]);
    i += 1;
  }
  // Taking remaining elements from arr2 if exist
  while (j < arr2.length) {
    result.push(arr2[j]);
    j += 1;
  }
  return result;
}

// My version
// function merge(arr1, arr2) {
//   const result = [];
//   let i = 0,
//     j = 0,
//     k = 0;
//   while (i < arr1.length || j < arr2.length) {
//     if (arr1[i] && arr2[j]) {
//       if (arr1[i] < arr2[j]) {
//         result[k] = arr1[i];
//         i += 1;
//       } else if (arr1[i] > arr2[j]) {
//         result[k] = arr2[j];
//         j += 1;
//       } else {
//         result[k] = arr1[i];
//         result[++k] = arr2[j];
//         i += 1;
//         j += 1;
//       }
//     } else if (arr1[i] && !arr2[j]) {
//       result[k] = arr1[i];
//       i += 1;
//     } else {
//       result[k] = arr2[j];
//       j += 1;
//     }
//     k += 1;
//   }
//   return result;
// }

console.log(merge([1, 3, 5], [2, 3, 6, 7, 8]));
// console.log(divideConquer([1, 3, 5, 2, 6, 7, 8]));
