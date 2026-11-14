class UnionFind {
  parent = [];
  rank = []; // Represent the height
  size = []; // Number of nodes
  constructor(v) {
    for (let i = 0; i < v; i++) {
      this.parent.push(i); //Considering vertex with numeric number Assigning vertex as parent
    }
    this.rank = new Array(v).fill(1);
    this.size = new Array(v).fill(1);
  }
  // Path comparision
  find(vertex) {
    if (vertex === this.parent[vertex]) {
      return vertex;
    }
    this.parent[vertex] = this.find(this.parent[vertex]);
    return this.parent[vertex];
  }
  union(u, v) {
    // Finding Parent of u and v
    const parentU = this.find(u);
    const parentV = this.find(v);

    // It means it belongs to same union and cycle exist.
    if (parentU === parentV) return false;

    if (this.rank[parentU] > this.rank[parentV]) {
      this.parent[parentV] = this.parent[parentU];
      this.size[parentU] += this.size[parentV];
    } else if (this.rank[parentU] < this.rank[parentV]) {
      this.parent[parentU] = this.parent[parentV];
      this.size[parentV] += this.size[parentU];
    } else {
      this.rank[parentU] += 1;
      this.size[parentU] += this.size[parentV];
      this.parent[parentV] = this.parent[parentU];
    }
    // Find union of two different set and returning union done as true.
    return true;
  }
}
