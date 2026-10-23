class Node {
  constructor(element) {
    this.data = element;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  heightByEdges(root) {
    if (root === null) {
      return -1;
    }
    const leftHeight = root.left ? this.heightByEdges(root.left) : 0;
    const rightHeight = root.right ? this.heightByEdges(root.right) : 0;
    return {
      height: Math.max(leftHeight, rightHeight) + 1,
      balanceFactor: leftHeight - rightHeight,
    };
  }
  recursiveInsert(root, element) {
    if (root === null) {
      const newNode = new Node(element);
      root = newNode;
      return root;
    } else if (root.data > element) {
      root.left = this.recursiveInsert(root.left, element);
    } else {
      root.right = this.recursiveInsert(root.right, element);
    }
    return root;
  }
}
