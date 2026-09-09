class Node {
  constructor(element) {
    this.data = element;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(element) {
    const newNode = new Node(element);
    if (!this.root) {
      this.root = newNode;
    } else {
      let updateNode = this.root;
      var insertStatus = false;
      while (!insertStatus) {
        if (updateNode.data === element) {
          insertStatus = true;
        }
        if (updateNode.data > element) {
          if (!updateNode.left) {
            updateNode.left = newNode;
            insertStatus = true;
          } else {
            updateNode = updateNode.left;
          }
        }
        if (updateNode.data < element) {
          if (!updateNode.right) {
            updateNode.right = newNode;
            insertStatus = true;
          } else {
            updateNode = updateNode.right;
          }
        }
      }
    }
    return this;
  }
  processData(input) {
    let arr = input.trim().split(/\s+/).map(Number);

    let n = arr[0];
    for (let i = 1; i <= n; i++) {
      this.insert(arr[i]);
    }
    return this;
  }
  
  find(element) {
    if (!this.root) return null;
    var currentNode = this.root,
      nodeFound = false;
    while (currentNode && !nodeFound) {
      if (currentNode.data === element) {
        nodeFound = true;
      } else if (currentNode.data > element) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }
}
const bst = new BinarySearchTree();
// console.log(
//   bst.processData(`6

// 4 2 3 1 7 6`),
// );
bst.insert(10);
bst.insert(12);
bst.insert(7);
bst.insert(13);
bst.insert(9);
bst.insert(5);
bst.insert(15);
console.log(bst.find(7));
