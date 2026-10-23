class DirectedGraph {
  constructor() {
    this.inDegreeAdjacencyList = new Map(); // Inverse Adjacency List
    this.outDegreeAdjacencyList = new Map(); // Adjacency List
  }

  addVertex(vertex) {
    if (
      !this.inDegreeAdjacencyList.has(vertex) &&
      !this.outDegreeAdjacencyList.has(vertex)
    ) {
      this.inDegreeAdjacencyList.set(vertex, []);
      this.outDegreeAdjacencyList.set(vertex, []);
    }
  }

  addIndegreeEdges(vertex, edges) {
    if (this.inDegreeAdjacencyList.has(vertex)) {
      this.inDegreeAdjacencyList.set(vertex, [
        ...this.inDegreeAdjacencyList.get(vertex),
        ...edges,
      ]);
    }
  }

  addOutdegreeEdges(vertex, edges) {
    if (this.outDegreeAdjacencyList.has(vertex)) {
      this.outDegreeAdjacencyList.set(vertex, [
        ...this.outDegreeAdjacencyList.get(vertex),
        ...edges,
      ]);
    }
  }

  removeOutdegree(vertex, edge) {
    this.outDegreeAdjacencyList.set(
      vertex,
      this.outDegreeAdjacencyList.get(vertex).filter((e) => e !== edge),
    );
  }

  removeIndegree(vertex, edge) {
    this.inDegreeAdjacencyList.set(
      vertex,
      this.inDegreeAdjacencyList.get(vertex).filter((e) => e !== edge),
    );
  }

  removeEdge(vertex, edge) {
    // Remove the adjacent vertex that mean out going edges from vertex
    if (this.outDegreeAdjacencyList.has(vertex)) {
      this.removeOutdegree(vertex, edge);
    }
    // Remove the vertex that coming into the edge that is inverser adajacency list
    if (this.inDegreeAdjacencyList.has(edge)) {
      this.removeIndegree(edge, vertex);
    }
  }

  removeVertex(vertex) {
    if (this.outDegreeAdjacencyList.has(vertex)) {
      for (const edge of this.outDegreeAdjacencyList.get(vertex)) {
        this.removeIndegree(edge, vertex);
      }
      this.outDegreeAdjacencyList.delete(vertex);
    }
    if (this.inDegreeAdjacencyList.has(vertex)) {
      for (const edge of this.inDegreeAdjacencyList.get(vertex)) {
        this.removeOutdegree(edge, vertex);
      }
      this.inDegreeAdjacencyList.delete(vertex);
    }
  }

  // Level by level traversal
  breadthFirstTraversal(startVertex) {
    if (!this.outDegreeAdjacencyList.has(startVertex)) return [];
    let pointer = -1;
    let queue = [startVertex];
    let visitedVertices = new Set(queue);
    const result = []; // Return result variable if output types array
    while (pointer + 1 !== queue.length) {
      pointer += 1;
      const vertex = queue[pointer];
      result.push(vertex); // Return result variable if output types array
      for (const adjacentVertex of this.outDegreeAdjacencyList.get(vertex)) {
        // Marking vertex as visited and also adding it to queue to visit their adjacent vertices in the next iteration.
        if (!visitedVertices.has(adjacentVertex)) {
          visitedVertices.add(adjacentVertex);
          queue.push(adjacentVertex);
        }
      }
    }
    return visitedVertices;
  }

  depthFirstTraversal_recursive(startVertex) {
    let vistitedVertices = new Set();
    const result = [];
    const dfs = (vertex) => {
      if (!vertex) return;
      vistitedVertices.add(vertex);
      result.push(vertex);
      const getSibilings = this.outDegreeAdjacencyList.get(vertex) || [];
      for (const sibiling of getSibilings) {
        if (!vistitedVertices.has(sibiling)) dfs(sibiling);
      }
    };
    dfs(startVertex);
    return result;
  }

  depthFirstTraversal_iterative(startVertex) {
    let stack = [startVertex];
    const visitedVertices = new Set(stack);
    const result = [];
    while (stack.length) {
      let currentVertex = stack.pop();
      result.push(currentVertex);
      const getSibilings = this.outDegreeAdjacencyList.get(currentVertex) || [];
      for (const sibiling of getSibilings) {
        if (!visitedVertices.has(sibiling)) {
          visitedVertices.add(sibiling);
          stack.push(sibiling);
        }
      }
    }
    return result;
  }

  hasCycleKahns() {
    const indegree = new Map();
    const queue = [];
    let pointer = -1;
    
    // Approach 2: Computing  indegree count from inDegreeAdjacencyList
    // for (const vertex of this.outDegreeAdjacencyList.keys()) {
    //   indegree.set(vertex, this.inDegreeAdjacencyList.get(vertex)?.length);
    // }

    // Approach 1: Clasic approach for computing number of incoming edges from outdegreeAdjacency list
    // Computing number vertices coming in to the vertex
    for (const vertex of this.outDegreeAdjacencyList.keys()) {
      for (const neighbour of this.outDegreeAdjacencyList.get(vertex)) {
        indegree.set(neighbour, (indegree.get(neighbour) || 0) + 1);
      }
    }
    // Taking in-degree vertices count 0 to queue
    for (const vertex of this.outDegreeAdjacencyList.keys()) {
      if (!indegree.has(vertex)) {
        queue.push(vertex);
      }
    }
    const topologicalSort = [];
    while (pointer + 1 !== queue.length) {
      pointer += 1;
      topologicalSort.push(queue[pointer]); // Taking topological ordering of vertices
      const neighbours = this.outDegreeAdjacencyList.get(queue[pointer]) || [];
      for (const neighbour of neighbours) {
        if (indegree.has(neighbour)) {
          let indegreeCount = indegree.get(neighbour) - 1;
          indegreeCount === 0 ? queue.push(neighbour) : "";
          indegree.set(neighbour, indegreeCount);
        }
      }
    }
    // Pointer --> Processed vertices from outdegree ajacency list
    // If pointer === number of vertices in the list then there is no cycle exist
    // Else there is an cycle exist
    return pointer + 1 !== this.outDegreeAdjacencyList.size;
  }
}

const dg = new DirectedGraph();
dg.addVertex("A");
dg.addVertex("B");
dg.addVertex("C");
dg.addVertex("D");
dg.addVertex("E");
dg.addIndegreeEdges("B", ["A"]);
dg.addIndegreeEdges("C", ["A", "E"]);
dg.addIndegreeEdges("D", ["B", "C"]);
dg.addIndegreeEdges("E", ["D"]);
dg.addOutdegreeEdges("A", ["B", "C"]);
dg.addOutdegreeEdges("B", ["D"]);
dg.addOutdegreeEdges("C", ["D"]);
dg.addOutdegreeEdges("D", ["E"]);
dg.addOutdegreeEdges("E", ["C"]);
// dg.addIndegreeEdges(1, [3]);
// dg.addIndegreeEdges(2, [1]);
// dg.addIndegreeEdges(3, [2, 4]);
// dg.addIndegreeEdges(4, [1]);
// dg.addOutdegreeEdges(1, [2, 4]);
// dg.addOutdegreeEdges(2, [3]);
// dg.addOutdegreeEdges(3, [1]);
// dg.addOutdegreeEdges(4, [3]);

// console.log(dg.depthFirstTraversal_recursive(1));
// console.log(dg.depthFirstTraversal_iterative(1));
// console.log("---In", dg.inDegreeAdjacencyList);
// console.log("---Out", dg.outDegreeAdjacencyList);
console.log(dg.hasCycleKahns());
// console.log(dg.outDegreeAdjacencyList);
// console.log(dg.inDegreeAdjacencyList)
// console.log(dg.breadthFirstTraversal(1));

// dg.removeEdge(1, 2);
// dg.removeEdge(1, 4);
// dg.removeVertex(1);
// console.log(dg);
