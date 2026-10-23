class Node {
  constructor(element) {
    this.data = element;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // Time complexity O(n)
  insertNodeAtTail(element) {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
    this.tail = newNode;
    this.length += 1;
    return this;
  }
  // Add node at the end of the list
  push(element) {
    const newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
    } else {
      // Updating tail.next will extent the linked list chain.
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length += 1;
    return true;
  }
  // Remove element at the end of the list
  // Time complexity O(n)
  pop() {
    if (!this.head) return false;
    let currentNode = this.head;
    let previousNode;
    // Looking for last node
    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    if (previousNode) {
      this.tail = previousNode;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length -= 1;
    return true;
  }

  removeLastNode() {
    let currentNode = this.head;
    let previousNode;
    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    previousNode.next = null;
    this.tail = previousNode;
    return this;
  }

  // Remove the first element
  // Time complexity O(1)
  shift() {
    const currentNode = this.head;
    if (!currentNode) return undefined;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length -= 1;
    return currentNode;
  }
  // Add element in the head
  // Time complexity O(1)
  unshift(element) {
    let newNode = new Node(element);
    let currentNode = this.head;
    if (!currentNode) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
    return true;
  }
  // Searching a node from head
  // Time complexity O(n)
  getNodeFromHead(position) {
    if (position < 0 || position >= this.length) {
      return null;
    } else {
      let counter = 0;
      let currentNode = this.head;
      while (counter < position) {
        currentNode = currentNode.next;
        counter += 1;
      }
      return currentNode;
    }
  }
  // Searching a node from tail
  // Time complexity O(n)
  // The fast pointer is moved positionFromTail nodes ahead of the slow pointer.
  // Then both pointers move together until the fast pointer reaches the last node. At that point, the slow pointer will be at the node that is positionFromTail positions away from the tail.
  getNodeFromTail(position) {
    let fastPointer = this.head;

    for (let i = 0; i < position; i++) {
      fastPointer = fastPointer.next;
    }
    let slowPointer = this.head;
    while (fastPointer.next !== null) {
      fastPointer = fastPointer.next;
      slowPointer = slowPointer.next;
    }
    return slowPointer.data;
  }

  // Updating value from head
  // Time complexity O(n)
  updateDataFromHead(position, value) {
    var getNode = this.getNodeFromHead(position);
    if (getNode) {
      getNode.data = value;
      return true;
    }
    return false;
  }

  // Time complexity O(n)
  insertNodeByPosition(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    } else if (position === 0) {
      return this.unshfit(element);
    } else if (position === this.length) {
      return this.push(element);
    } else {
      var newNode = new Node(element); // New Reference
      var previousNode = this.getNodeFromHead(position - 1); // header reference, Taking value before one position.
      newNode.next = previousNode.next; // Assigning all upcoming values to newNode of next
      previousNode.next = newNode; // It will update the head with latest list
      this.length += 1;
      return true;
    }
  }

  // Time complexity O(n)
  removeNodeByPosition(position) {
    if (position < 0 || position > this.length) {
      return false;
    } else if (position === 0) {
      return this.shift();
    } else if (position === this.length - 1) {
      return this.pop();
    } else {
      // var getNodeFromHead = this.getNodeFromHead(position);
      // getNodeFromHead = getNodeFromHead.next;
      var getNodeFromHead = this.getNodeFromHead(position - 1);
      var removeValue = getNodeFromHead.next;
      getNodeFromHead.next = removeValue.next;
      this.length -= 1;
      return true;
    }
  }
  // n - will be position to remove
  removeNodeFromTail(n) {
    var fastPointer = this.head;
    for (let i = 0; i < n; i++) {
      fastPointer = fastPointer.next;
    }
    if (fastPointer === null) {
      return this.head.next;
    }
    var slowPointer = this.head;
    while (fastPointer && fastPointer.next !== null) {
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next;
    }
    const removeNode = slowPointer.next;
    if (removeNode) {
      slowPointer.next = removeNode.next;
      this.length -=1
      return this;
    }
    return null;
  }
  // Time complexity O(n)
  reverseList() {
    var list = this.head;
    this.head = this.tail;
    this.tail = list;
    var listNext = null;
    var previousNode = null;
    let count = 0;
    while (count < this.length) {
      listNext = list.next;
      list.next = previousNode;
      previousNode = list;
      list = listNext;
      count += 1;
    }
    return this;
  }

  // Hacker Rank
  reverse() {
    var previousNode = null;
    var listNext = null;
    var currentNode = this.head;
    while (currentNode !== null) {
      listNext = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = listNext;
    }
    const tail = this.head;
    this.head = this.tail;
    this.tail = tail;
    return this;
  }
  // This function used to remove the matched data from the linked list and return new list instead of updating the main list
  removeElementsFromList(val) {
    var newHead = this.head;
    let currentNode = newHead; // Duplicate the  newHead
    let previousNode = null; // It will matain the previous value of the current node
    while (currentNode) {
      if (currentNode.data === val) {
        let removeNode = currentNode;
        if (previousNode) {
          previousNode.next = removeNode.next;
        } else {
          newHead = newHead.next;
        }
      } else {
        previousNode = currentNode;
      }
      currentNode = currentNode.next;
    }
    return newHead;
  }
  // Hackerrank
  // Remove the duplicate nodes from the list
  removeDuplicatesNodes() {
    var currentNode = this.head;
    let previousNode = null;
    while (currentNode) {
      if (previousNode) {
        if (currentNode.data !== previousNode.data) {
          previousNode.next = currentNode;
          previousNode = previousNode.next; // Assigning next node
        }
        // Below condition for last node. Since we need to disconnect all duplicate nodes
        if (
          currentNode.data === previousNode.data &&
          currentNode.next === null
        ) {
          previousNode.next = null;
        }
      } else {
        previousNode = currentNode;
      }
      currentNode = currentNode.next;
    }
    return this.head;
  }
}

const singlyList = new SinglyLinkedList();
singlyList.push("One");
singlyList.push("One");
singlyList.push("Second");
singlyList.push("Second");
singlyList.push("Second");
singlyList.push("Third");
// singlyList.push("Third");
// singlyList.push("Third");
// singlyList.push("Third");
// singlyList.push("Third");
console.log(singlyList.removeDuplicatesNodes());
