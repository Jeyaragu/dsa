// class Node {
//   constructor(element) {
//     this.data = element;
//     this.next = null;
//   }
// }
// function insertBucket(bin, node) {
//   let currentNode = bin;
//   while (currentNode.next) {
//     currentNode = currentNode.next;
//   }
//   currentNode.next = node;
//   return;
// }

function digitCount(num) {
  if (num === 0) return 1;
  // Since num is decimal number so using log10
  return Math.floor(Math.log10(num)) + 1;
}

function findPass(nums) {
  let maxPasses = 0;
  for (let i = 0; i < nums.length; i++) {
    maxPasses = Math.max(maxPasses, digitCount(nums[i])); // Taking maximum digit value
  }
  return maxPasses;
}

function radixSort(nums) {
  let divisor = 1; // By default divisor is 1
  let numberOfPass = findPass(nums); // Getting number of passes required to sort the input
  for (let pass = 0; pass < numberOfPass; pass++) {
    const bins = Array.from({ length: 10 }, () => []); // Considering decimal number and creating array with empty array elements
    for (let i = 0; i < nums.length; i++) {
      const position = Math.floor(nums[i] / divisor) % 10; // Finding position by digit. 10 --> Representing decimal number
      bins[position].push(nums[i]); // Pushing to correct bucket
    }
    divisor *= 10; // Increasing divisor value to find the posisiton by next digit from backword direction
    nums = [].concat(...bins);
  }
  return nums;
}

console.log(radixSort([23, 567, 89, 12234324, 90]));
// radixSort([30, 19, 20, 55, 44, 1, 75, 0, 99]);
// function radixSort(nums) {
//   let divisor = 1; // Default divisor is 1
//   let numberOfPass = findPass(nums); // Getting number passes required to sort the input
//   const bins = new Array(10).fill(null);
//   for (let pass = 0; pass < numberOfPass; pass++) {
//     for (let i = 0; i < nums.length; i++) {
//       const node = new Node(nums[i]);
//       const position = Math.floor(nums[i] / divisor) % 10; // Finding position by digit. 10 --> Representing decimal number
//       if (bins[position] === null) {
//         bins[position] = node;
//       } else {
//         insertBucket(bins[position], node);
//       }
//     }
//     divisor *= 10; // Increasing divisor value to find the posisiton by next digit from backword
//     let i = 0, // i --> tracking the bins position
//       j = 0; // j --> tracking the input array position
//     while (i < bins.length) {
//       if (bins[i] !== null) {
//         let currentBin = bins[i];
//         while (currentBin) {
//           nums[j] = currentBin.data;
//           currentBin = currentBin.next;
//           j += 1;
//         }
//         bins[i] = null;
//       }
//       i++;
//     }
//   }
//   console.log(nums);
//   return nums;
// }
