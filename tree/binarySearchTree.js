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

  // Iterative approach
  find(element) {
    var currentNode = this.root;
    while (currentNode !== null) {
      if (currentNode.data === element) {
        return currentNode;
      } else if (currentNode.data > element) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  // Recursive approach
  recursiveFind(root, element) {
    if (root !== null) {
      if (root.data === element) {
        return root;
      } else if (root.data > element) {
        return this.recursiveFind(root.left, element);
      } else {
        return this.recursiveFind(root.right, element);
      }
    }
    return null;
  }

  breathFirstSearch() {
    if (this.root === null) {
      return [];
    }
    let pointer = -1;
    const queue = [this.root];
    const visitedNodes = [];
    while (pointer + 1 !== queue.length) {
      pointer += 1;
      const currentNode = queue[pointer];
      visitedNodes.push(currentNode.data);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return visitedNodes;
  }
  
  //102. Binary Tree Level Order Traversal
  // Think from recursion perpesptive
  levelOrder() {
    if (this.root === null) return [];
    let pointer = -1;
    const queue = [[this.root]];
    const groupLevelNodes = [];
    while (groupLevelNodes.length === 0 || groupLevelNodes[pointer + 1]) {
      if (groupLevelNodes.length === 0) {
        groupLevelNodes.push([this.root.data]);
      } else {
        pointer += 1;
        const currentNode = queue[pointer];
        const levelNodes = [];
        const levelData = [];
        for (let i = 0; i < currentNode.length; i++) {
          if (currentNode[i].left) {
            levelNodes.push(currentNode[i].left);
            levelData.push(currentNode[i].left.data);
          }
          if (currentNode[i].right) {
            levelNodes.push(currentNode[i].right);
            levelData.push(currentNode[i].right.data);
          }
        }
        if (levelNodes.length) {
          queue.push(levelNodes);
          groupLevelNodes.push(levelData);
        }
      }
    }
    return groupLevelNodes;
  }

  insertUsingPointer(element) {
    var currentNode = this.root;
    var pointer = null;
    while (currentNode !== null) {
      pointer = currentNode;
      if (currentNode.data === element) {
        return currentNode;
      } else if (currentNode.data > element) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    const newNode = new Node(element);
    if (pointer.data > element) {
      pointer.left = newNode;
    } else {
      pointer.righ = newNode;
    }
    return this.root;
  }

  recursiveInsert(root, element) {
    if (root === null) {
      return new Node(element);
    } else if (root.data > element) {
      root.left = this.recursiveInsert(root.left, element);
    } else {
      root.right = this.recursiveInsert(root.right, element);
    }
    return root;
  }
  inOrderPredecessor(root) {
    var pointer = null;
    while (root !== null) {
      pointer = root;
      root = root.right;
    }
    return pointer;
  }
  inOrderSuccessor(root) {
    var pointer = null;
    while (root !== null) {
      pointer = root;
      root = root.left;
    }
    return pointer;
  }
  heightInNodes(root) {
    if (root === null) {
      return 0;
    }
    const leftHeight = this.heightInNodes(root.left);
    const rightHeight = this.heightInNodes(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  heightInEdges(root) {
    if (root === null) {
      return -1;
    }
    const leftHeight = this.heightInEdges(root.left);
    const rightHeight = this.heightInEdges(root.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  remove(root, element) {
    if (root === null) {
      return null;
    }
    if (root.data > element) {
      root.left = this.remove(root.left, element);
    } else if (root.data < element) {
      root.right = this.remove(root.right, element);
    } else {
      if (root.left === null && root.right === null) {
        return null;
      }
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      if (this.heightInEdges(root.left) > this.heightInEdges(root.right)) {
        let findPredecessor = this.inOrderPredecessor(root.left);
        root.data = findPredecessor.data;
        root.left = this.remove(root.left, findPredecessor.data);
      } else {
        let findSuccessor = this.inOrderSuccessor(root.right);
        root.data = findSuccessor.data;
        root.right = this.remove(root.right, findSuccessor.data);
      }
    }
    return root;
  }
  findSecondLargest() {
    let root = this.root;
    let pointer = null;
    while (root !== null) {
      pointer = root;
      root = root.right;
    }
    return pointer.data
  }
}
const bst = new BinarySearchTree();
// console.log(
//   bst.processData(`6

// 4 2 3 1 7 6`),
// );
bst.insert(15);
bst.insert(10);
bst.insert(9);
bst.insert(20);
bst.insert(19);
bst.insert(21);
bst.insert(18);
const root = bst.root;
// console.log(bst.findHeight(root))
console.log(bst.remove(root, 20));
