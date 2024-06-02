export class DirectedGraph<Type> extends Map<Type, { nextNodes: Set<Type> }> {
  public static create<Type> (origin: Type, getNextNodes: (node: Type) => Type[]): DirectedGraph<Type> {
    const graph = new DirectedGraph<Type>();

    const queue = new Array<Type>();
    queue.push(origin);

    while (queue.length >= 1) {
      const node = queue.shift();
      if (!node) return graph;

      const nextNodes = new Set<Type>();
      graph.set(node, { nextNodes });

      for (const nextNode of getNextNodes(node)) {
        if (graph.has(nextNode)) continue;
        queue.push(nextNode);
        nextNodes.add(nextNode);
      }
    }

    return graph;
  }

  public areLinked (source: Type, target: Type) {
    const checked = new Set<Type>();

    const queue = new Array<Type>();
    queue.push(source);

    while (queue.length >= 1) {
      const node = queue.shift();
      if (!node) return;

      if (node === target) return true;
      checked.add(node);

      for (const nextNode of this.getNext(node)) {
        queue.push(nextNode);
      }
    }
  }

  public getNext (node: Type): Set<Type> {
    const target = this.get(node);
    if (!target) throw new Error('node not found in graph');
    return target.nextNodes;
  }
}
