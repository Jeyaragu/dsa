// Max Heap
// i - index , arr -- array of number
// Bubble up or Heapify-- The goal is to move the newly inserted element upward until the heap property is restored.
function insertMaxHeap(arr, i) {
  let temp = i;
  // Finding Parent node of given i
  let parentIndex = Math.floor((i - 1) / 2);
  // Comparing with parent of the element
  while (parentIndex >= 0 && arr[parentIndex] < arr[temp]) {
    [arr[parentIndex], arr[temp]] = [arr[temp], arr[parentIndex]];
    temp = parentIndex;
    parentIndex = Math.floor((parentIndex - 1) / 2);
  }
  return arr;
}

function createHeap(arr) {
  if (arr.length === 0) {
    return [];
  } else {
    for (let i = 1; i < arr.length; i++) {
      insertMaxHeap(arr, i);
    }
    return arr;
  }
}
console.log(createHeap([10, 20, 30, 25, 5, 40, 35]));
// console.log(createHeap([10, 20]));

// arr --> Heap
// n -->  Length of the heap
// Deleting top element
function deleteMaxHeap(arr, n) {
  let parentIndex = 0;
  let x = arr[parentIndex]; // Parent Index
  arr[parentIndex] = arr[n];
  let leftChild = 2 * parentIndex + 1;
  while (leftChild < n - 1) {
    // checking whether the right child is greater than left child
    // if yes assigning left as right child since its has a greater element
    if (arr[leftChild] < arr[leftChild + 1]) {
      leftChild = leftChild + 1;
    }
    // Comparing the child of the parent element
    if (arr[leftChild] && arr[leftChild] > arr[parentIndex]) {
      [arr[parentIndex], arr[leftChild]] = [arr[leftChild], arr[parentIndex]];
      parentIndex = leftChild;
    }
    leftChild = 2 * parentIndex + 1;
  }
  // Storing deleted element in the free space i.e last element.
  arr[n] = x;
  return x;
}

function deleteMinHeap(arr) {
  let n = arr.length;
  let parentIndex = 0;
  let x = arr[parentIndex]; // Parent Element
  arr[parentIndex] = arr[n - 1]; // Assigning last element as root for temporary
  let leftChild = 2 * parentIndex + 1;
  while (leftChild < n - 1) {
    if (arr[leftChild] > arr[leftChild + 1]) {
      leftChild = leftChild + 1;
    }

    if (arr[leftChild] && arr[leftChild] !== arr[parentIndex]) {
      [arr[parentIndex], arr[leftChild]] = [arr[leftChild], arr[parentIndex]];
      parentIndex = leftChild;
    }
    leftChild = 2 * parentIndex + 1;
  }
  // Storing deleted element in the free space i.e last element.
  arr[n] = x;
  return x;
}
console.log(deleteMaxHeap([20, 50, 40, 60, 70, 55, 56]));
// arr --> Heap
function heapSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    deleteMaxHeap(arr, i);
  }
  return arr;
}
// console.log(heapSort([40,35,30,15,10,25,5]))
