class UnDirectedGraph {
  constructor() {
    this.adjacencyList = new Map();
  }
  addVertex(key) {
    if (!this.adjacencyList.has(key)) this.adjacencyList.set(key, []);
  }
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(vertex1, [
        ...this.adjacencyList.get(vertex1),
        vertex2,
      ]);
      this.adjacencyList.set(vertex2, [
        ...this.adjacencyList.get(vertex2),
        vertex1,
      ]);
    }
    return;
  }

  removeAdjacent(vertex, adjacent) {
    const getAdjacents = this.adjacencyList.get(vertex) || [];
    if (getAdjacents && getAdjacents.length) {
      const newEdges = getAdjacents.filter((e) => e !== adjacent);
      this.adjacencyList.set(vertex, newEdges);
    }
    return;
  }

  removeEdge(vertex1, vertex2) {
    this.removeAdjacent(vertex1, vertex2);
    this.removeAdjacent(vertex2, vertex1);
    return;
  }

  removeVertex(vertex) {
    const getEdges = this.adjacencyList.get(vertex);
    if (getEdges && getEdges.length) {
      for (const edge of getEdges) {
        this.removeAdjacent(edge, vertex);
      }
      this.adjacencyList.delete(vertex);
    }
    return;
  }

  // Level by level traversal
  // For BFS traversal order, the vertex should be added when it is dequeued/processed:
  breadthFirstTraversal(startVertex) {
    if (!this.adjacencyList.has(startVertex)) return [];
    let pointer = -1;
    let bfsQueue = [startVertex];
    let bfsResult = new Set(bfsQueue);
    const result = []; // Return result variable if output types array
    while (pointer + 1 !== bfsQueue.length) {
      pointer += 1;
      const currentVertex = bfsQueue[pointer];
      result.push(currentVertex);
      for (const vertex of this.adjacencyList.get(currentVertex)) {
        // Marking vertex as visited and also adding it to queue to visit their adjacent vertices in the next iteration.
        if (!bfsResult.has(vertex)) {
          bfsResult.add(vertex);
          bfsQueue.push(vertex);
        }
      }
    }
    return result;
  }

  // It same like the pre-order traversal from tree
  depthFirstSearch_recursive(startVertex) {
    let visitedVertex = new Set();
    let result = [];
    const depthFirstTraversal = (vertex) => {
      if (!vertex) return;
      visitedVertex.add(vertex);
      result.push(vertex);
      const getAdjacent = this.adjacencyList.get(vertex) || [];
      for (const neighbour of getAdjacent) {
        if (!visitedVertex.has(neighbour)) {
          depthFirstTraversal(neighbour);
        }
      }
    };
    depthFirstTraversal(startVertex);
    return result;
  }

  // Text-book solution
  // A vertex is considered "visited in traversal order" when it is popped from the stack.
  depthFirstSearch_Iterative1(startVertex) {
    if (!this.adjacencyList.has(startVertex)) return [];
    let stack = [startVertex];
    let visitedVertex = new Set(stack);
    let currentVertex = startVertex;
    let result = [];
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);
      let adjacencyList = this.adjacencyList.get(currentVertex) || [];
      for (const vertex of adjacencyList) {
        if (!visitedVertex.has(vertex)) {
          visitedVertex.add(vertex);
          stack.push(vertex);
        }
      }
    }
    return result;
  }

  // Using DFS
  connectedComponents(graph) {
    let result = [];
    const visitedStatus = new Set();
    for (let vertex of graph.keys()) {
      // Perform DFS only for non visited vertex
      if (!visitedStatus.has(vertex)) {
        const componets = [];
        const stack = [vertex];
        visitedStatus.add(vertex);
        while (stack.length) {
          const currentVertex = stack.pop();
          componets.push(currentVertex);
          const getVertices = graph.get(currentVertex) || [];
          for (const neighbour of getVertices) {
            if (!visitedStatus.has(neighbour)) {
              stack.push(neighbour);
              visitedStatus.add(neighbour);
            }
          }
        }
        result.push(componets);
      }
    }
    return result;
  }
  // DFS Parent Tracking - Using recursion
  cycleDetection_dfs() {
    const visitedStatus = new Set();
    const dfs = (currentVertex, parent) => {
      visitedStatus.add(currentVertex); // add current vertex to visited list
      const getAdjacents = this.adjacencyList.get(currentVertex) || []; //Taking adjacency list
      for (const neighbour of getAdjacents) {
        if (!visitedStatus.has(neighbour)) {
          // If neighbour is not visited perform DFS
          if (dfs(neighbour, currentVertex)) return true;
        } else if (neighbour !== parent) return true; // This condition also handle the parallel edges
      }
      return false;
    };
    for (const vertex of this.adjacencyList.keys()) {
      if (dfs(vertex, -1)) return true;
    }
    return false;
  }

  // BFS Parent Tracking using queue
  cycleDetection_bfs() {
    const visitedStatus = new Set();
    const bfs = (vertex, parent) => {
      let pointer = -1;
      const queue = [vertex];
      visitedStatus.add(vertex);
      while (pointer + 1 !== queue.length) {
        pointer += 1;
        const currentVertex = queue[pointer];
        const getAdjacents = this.adjacencyList.get(currentVertex) || [];
        for (const neighbour of getAdjacents) {
          if (!visitedStatus.has(neighbour)) {
            visitedStatus.add(neighbour);
            queue.push(neighbour); // pushing not visited vertex to queue
          } else if (neighbour !== parent) return true; // It hanldes the parallel edges
        }
      }
      return false;
    };

    for (const vertex of this.adjacencyList.keys()) {
      if (bfs(vertex, -1)) return true;
    }
    return false;
  }

  shortestPath_bfs(sourceVertex) {
    const distanceMap = new Map(); // Using map to support all type of vertices i.e number, string, array, object and function
    for (const vertex of this.adjacencyList.keys()) {
      distanceMap.set(vertex, -1); // -1 is unreachable
    }
    const queue = [sourceVertex];
    let pointer = -1;

    distanceMap.set(sourceVertex, 0); // Making sources vertex to zero
    while (pointer + 1 !== queue.length) {
      const currentVertex = queue[++pointer];
      for (const neighbor of this.adjacencyList.get(currentVertex)) {
        if (distanceMap.has(neighbor) && distanceMap.get(neighbor) === -1) {
          queue.push(neighbor);
          distanceMap.set(neighbor, distanceMap.get(currentVertex) + 1);
        }
      }
    }
    return distanceMap;
  }
}

const g = new UnDirectedGraph();

// Connected Components
// g.addVertex(0);
// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addVertex(4);
// g.addVertex(5);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 2);
// g.addEdge(3, 4);

// Test Case for BFS
// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addEdge(1, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 3);

g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addVertex(4);
g.addVertex(5);
g.addVertex(6);
g.addVertex(7);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(2, 3);
g.addEdge(3, 4);
g.addEdge(3, 5);
g.addEdge(4, 5);
g.addEdge(5, 6);
g.addEdge(5, 7);
// console.log(g.adjacencyList);
console.log(g.shortestPath_bfs(1));

// Add and remove test case
// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addVertex(4);
// g.addVertex(5);
// g.addEdge(1, 2);
// g.addEdge(1, 4);
// g.addEdge(2, 3);
// g.addEdge(3, 4);
// g.addEdge(3, 5);
// g.addEdge(4, 5);
// g.removeEdge(1, 2);
// g.removeEdge(3, 5);
// g.removeVertex(5);
// console.log(g.breadthFirstSearch(2));
// console.log(g.adjacencyList);
