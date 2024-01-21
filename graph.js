class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Add a single vertex to the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add an array of vertices to the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // Add an edge between two vertices
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // Remove an edge between two vertices
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // Remove a vertex from the graph
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (const node of this.nodes) {
      node.adjacent.delete(vertex);
    }
  }

  // Perform Depth First Search (DFS) starting from a given vertex
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(node) {
      if (!node || visited.has(node)) {
        return;
      }

      visited.add(node);
      result.push(node.value);

      for (const neighbor of node.adjacent) {
        dfs(neighbor);
      }
    }

    dfs(start);
    return result;
  }

  // Perform Breadth First Search (BFS) starting from a given vertex
  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];

    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };
