class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  // Using recursion method
  inorderTraversal(root) {
    var result = [];
    if (root !== null) {
      result = result.concat(this.inorderTraversal(root.left));
      result.push(root.data);
      result = result.concat(this.inorderTraversal(root.right));
    }
    return result;
  }
  // Using recursion method
  preOrderTraversal(root) {
    var result = [];
    if (root) {
      result.push(root.data);
      result = result.concat(this.preOrderTraversal(root.left));
      result = result.concat(this.preOrderTraversal(root.right));
    }
    return result;
  }
  postOrderTraversal(root) {
    let result = [];
    if (root) {
      result = result.concat(this.postOrderTraversal(root.left));
      result = result.concat(this.postOrderTraversal(root.right));
      result.push(root.data);
    }
    return result;
  }
  // Using stack method
  preOrderTraversalUsingStack() {
    const preOrderstack = [];
    const result = [];
    let currentNode = this.root;
    while (currentNode !== null || preOrderstack.length > 0) {
      if (currentNode) {
        result.push(currentNode.data);
        preOrderstack.push(currentNode);
        currentNode = currentNode.left;
      } else {
        currentNode = preOrderstack.pop();
        currentNode = currentNode.right;
      }
    }
    return result;
  }

  inorderTraversalUsingStack() {
    const inorderStack = [];
    const result = [];
    let temp = this.root;
    while (temp !== null || inorderStack.length !== 0) {
      if (temp !== null) {
        inorderStack.push(temp);
        temp = temp.left;
      } else {
        const visitedNode = inorderStack.pop();
        result.push(visitedNode.data);
        temp = visitedNode.right;
      }
    }
    return result;
  }

  postOrderTraversalUsingStack() {
    if (!this.root) return [];
    const stack1 = [this.root];
    const stack2 = [];
    const result = [];
    while (stack1.length > 0) {
      const visitedNode = stack1.pop();
      stack2.push(visitedNode);
      if (visitedNode.left) stack1.push(visitedNode.left);
      if (visitedNode.right) stack1.push(visitedNode.right);
    }
    while (stack2.length) {
      result.push(stack2.pop().data);
    }
    return result;
  }
}
