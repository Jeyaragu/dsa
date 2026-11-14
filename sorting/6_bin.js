// class Node {
//   constructor(element) {
//     this.data = element;
//     this.next = null;
//   }
// }

// function insertBin(bin, node) {
//   let currentNode = bin;
//   while (currentNode.next) {
//     currentNode = currentNode.next;
//   }
//   currentNode.next = node;
//   return;
// }

function binOrBucketSort(nums) {
  const max = Math.max(...nums);
  const bins = Array.from({ length: max + 1 }, () => []);
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    bins[element].push(element);
  }
  let i = 0, // i --> tracking the bins position
    j = 0; // j --> tracking the input array position
  while (i < bins.length) {
    for (let k = 0; k < bins[i].length; k++) {
      nums[j] = bins[i][k];
      j++;
    }
    i += 1;
  }
  return nums;
}
// console.log(binOrBucketSort([4, 1, 3, 5, 4, 0, 1]));
// console.log(binOrBucketSort([44, 7, 22, 2, 27, 38, 32, 16]));
