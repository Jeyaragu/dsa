class MinBinaryHeap {
  constructor() {
    this.minHeap = []; // Multi-dimension array contains [distance, From Previous Visited Vertex]
  }
  isEmpty() {
    return this.minHeap.length === 0;
  }
  enqueue(val) {
    this.minHeap.push(val);
    this.#bubbleUp(this.minHeap.length - 1);
  }
  dequeue() {
    let min = this.minHeap[0];
    let last = this.minHeap.pop();
    if (this.minHeap.length > 0) {
      this.minHeap[0] = last;
      this.#sinkDown();
    }
    return min;
  }

  // Heapify with the given i
  #bubbleUp(i) {
    while (i > 0) {
      // Finding Parent node of given i
      let parentIndex = (i - 1) >> 1;
      // Comparing with parent and i
      if (this.minHeap[parentIndex][0] > this.minHeap[i][0]) {
        [this.minHeap[parentIndex], this.minHeap[i]] = [
          this.minHeap[i],
          this.minHeap[parentIndex],
        ];
        i = parentIndex;
      } else {
        break;
      }
    }
    return;
  }

  // Deleting an element from heap
  #sinkDown() {
    let i = 0; // Removing top element
    while (true) {
      let leftChild = (i << 1) + 1;
      let rightChild = leftChild + 1;
      let smallest = i; // Initializing small value from i
      // Find the smallest value from the direct adjacents
      if (
        leftChild < this.minHeap.length &&
        this.minHeap[leftChild][0] < this.minHeap[smallest][0]
      )
        smallest = leftChild;
      if (
        rightChild < this.minHeap.length &&
        this.minHeap[rightChild][0] < this.minHeap[smallest][0]
      )
        smallest = rightChild;
      // Exist the loop with if i and smallest value are from same index
      if (smallest === i) break;
      [this.minHeap[smallest], this.minHeap[i]] = [
        this.minHeap[i],
        this.minHeap[smallest],
      ];
      i = smallest;
    }
  }
}

class UnDirectedWeightedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) this.adjacencyList.set(vertex, []);
  }
  addEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList.has(vertex1)) this.addVertex(vertex1);
    if (!this.adjacencyList.has(vertex2)) this.addVertex(vertex2);

    const vertex1Neighbors = this.adjacencyList.get(vertex1);
    vertex1Neighbors.push({ vertex: vertex2, weight });
    this.adjacencyList.set(vertex1, vertex1Neighbors);

    const vertex2Neighbors = this.adjacencyList.get(vertex2);
    vertex2Neighbors.push({ vertex: vertex1, weight });
    this.adjacencyList.set(vertex2, vertex2Neighbors);
    return;
  }

  dijkstraAlgorithm(startVertex, destination) {
    if (!this.adjacencyList.has(startVertex)) return null;
    const distance = new Map(); // Which give the distance
    const previous = new Map(); // Which give the Path
    const visitedStatus = new Set();
    for (const vertex of this.adjacencyList.keys()) {
      distance.set(vertex, Infinity);
      previous.set(vertex, null);
    }
    distance.set(startVertex, 0); // Distance of starting vertex must be zero

    const minHeap = new MinBinaryHeap();
    minHeap.enqueue([0, startVertex]);
    while (!minHeap.isEmpty()) {
      const [d, u] = minHeap.dequeue(); // Taking smallest value from priority queue
      if (visitedStatus.has(u)) continue; // If u already visited, skipping the below steps and moving on next item from the queue
      visitedStatus.add(u); // Setting visited status of current vertex
      const getNeighbors = this.adjacencyList.get(u) || [];
      for (const { vertex, weight } of getNeighbors) {
        if (!visitedStatus.has(vertex) && distance.get(vertex) > weight + d) {
          const updatedWeight = weight + d;
          distance.set(vertex, updatedWeight);
          minHeap.enqueue([updatedWeight, vertex]);
          previous.set(vertex, u);
        }
      }
    }
    let direction = [];
    function path(d) {
      if (d === null) return;
      path(previous.get(d));
      direction.push(d);
    }
    path(destination);
    return { direction, distance, previous };
  }
}

const udwg = new UnDirectedWeightedGraph();
udwg.addVertex("A");
udwg.addVertex("B");
udwg.addVertex("C");
udwg.addVertex("D");
udwg.addVertex("E");
udwg.addVertex("F");
udwg.addEdge("A", "B", 4);
udwg.addEdge("A", "C", 2);
udwg.addEdge("B", "E", 3);
udwg.addEdge("C", "D", 2);
udwg.addEdge("C", "F", 4);
udwg.addEdge("D", "E", 3);
udwg.addEdge("D", "F", 1);
udwg.addEdge("E", "F", 1);
console.log(udwg.dijkstraAlgorithm("A", "E"));
