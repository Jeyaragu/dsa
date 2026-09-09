class Node {
  constructor(element) {
    this.data = element;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(element) {
    var newNode = new Node(element);
    if (this.head && this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      this.head = newNode;
      this.tail = newNode;
    }
    this.size += 1;
    return true;
  }

  pop() {
    if (!this.head) return false;
    var removeNode = this.tail;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removeNode.prev;
      this.tail.next = null;
      removeNode.prev = null; // Making prev is null just to avoid the references and to take only value
    }
    this.size -= 1;
    return true;
  }

  shift() {
    if (!this.head) return false;
    var oldHead = this.head;
    this.head = this.head.next;
    this.head && (this.head.prev = null); // This condition is to if the head is null
    oldHead.next = null; // Making next is null just to return node with out any references
    this.size -= 1;
    return oldHead;
  }

  unshift(element) {
    var newNode = new Node(element);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size += 1;
    return this;
  }

  getNodeByPosition(position) {
    if (position < 0 || position >= this.size) return null;
    var count, currentNode;
    if (position <= this.size / 2) {
      count = 0;
      currentNode = this.head;
      while (position !== count) {
        currentNode = currentNode.next;
        count += 1;
      }
    } else {
      count = this.size - 1;
      currentNode = this.tail;
      while (position !== count) {
        currentNode = currentNode.prev;
        count -= 1;
      }
    }
    return currentNode;
  }

  updateElementByPosition(position, value) {
    var getNode = this.getNodeByPosition(position);
    if (!getNode) return false;
    getNode.data = value;
    return true;
  }

  insertNode(position, value) {
    if (position < 0 || position > this.size) return false;
    if (position === 0) {
      return this.unshift(value);
    } else if (position === this.size) {
      return this.push(value);
    } else {
      var newNode = new Node(value);
      var getPreviousNode = this.getNodeByPosition(position - 1); // Taking previous node from the position
      var nextNode = getPreviousNode.next; // Taking reference of the next node
      nextNode.prev = newNode;
      newNode.next = nextNode;
      getPreviousNode.next = newNode;
      newNode.prev = getPreviousNode;
      this.size += 1;
      return true;
    }
  }
  removeNode(position) {
    if (position < 0 || position > this.size) return false;
    if (position === 0) {
      return this.shift();
    } else if (position === this.size - 1) {
      return this.pop();
    } else {
      var previousNode = this.getNodeByPosition(position - 1);
      var removeNode = previousNode.next;
      previousNode.next = removeNode.next;
      removeNode.prev = previousNode;
      this.size -= 1;
      
      // Removing references and returning only element
      removeNode.next = null;
      removeNode.prev = null;
      return removeNode;
    }
  }
  // Hacker rank.
  // Insert the value to the location to maintain the sorted list
  sortedInsert(value) {
    var newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      var currentNode = this.head;
      let previousNode = null;
      while (currentNode?.data < value) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if (!currentNode) {
        previousNode.next = newNode;
        newNode.prev = previousNode;
      } else {
        if (previousNode) {
          currentNode.prev = newNode;
          newNode.next = currentNode;
          previousNode.next = newNode;
          newNode.prev = previousNode;
        } else {
          newNode.next = this.head;
          this.head.prev = newNode;
          this.head = newNode;
        }
      }
    }
    this.size += 1;
    return this;
  }

  reverse() {
    var currentNode = this.head;
    var previousNode = null,
      nextNode = null;
    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode && (previousNode.prev = currentNode);
      previousNode = currentNode;
      currentNode = nextNode; 
    }
    var newTail = this.head;
    this.head = this.tail;
    this.head.prev = null;
    this.tail = newTail;
    return this;
  }
}

var doubleyLinkedList = new DoublyLinkedList();
doubleyLinkedList.push(1);
doubleyLinkedList.push(2);
doubleyLinkedList.push(3);
// doubleyLinkedList.push(4);
// doubleyLinkedList.push(5);
// doubleyLinkedList.push(6);
console.log(doubleyLinkedList.reverse());
