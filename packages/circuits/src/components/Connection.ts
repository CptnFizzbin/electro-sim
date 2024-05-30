type ChangeHandler = () => void

export class Connection {
  private connectedTo = new Set<Connection>();
  private handlers = new Set<ChangeHandler>();
  #sourceAmps = 0;
  #amps = 0;

  public get sourceAmps () {
    return this.#sourceAmps;
  }

  public get amps () {
    return this.#amps;
  }

  public emitCurrent (amps: number) {
    this.#sourceAmps = amps;
    this.emitUpdate();
  }

  public update () {
    const powerSource = this.findNode((node) => (
      node.sourceAmps >= 1
      && node.isConnectedTo(this)
    ));

    if (powerSource) {
      this.#amps = powerSource.sourceAmps;
    } else {
      this.#amps = 0;
    }

    this.handlers.forEach((handler) => handler());
  }

  public onChange (handler: ChangeHandler) {
    this.handlers.add(handler);
  }

  public isConnectedTo (target: Connection): boolean {
    return !!this.findNode((node) => node === target);
  }

  public connect (...targets: Connection[]) {
    targets.forEach((target) => this.connectedTo.add(target));

    this.emitUpdate();

    return this;
  }

  public disconnect (...targets: Connection[]) {
    targets.forEach((target) => this.connectedTo.delete(target));

    this.emitUpdate();

    return this;
  }

  private findNode (searchFn: (node: Connection) => boolean): Connection | undefined {
    const checked = new Set<Connection>();

    const queue = new Array<Connection>();
    queue.push(this);

    while (queue.length >= 1) {
      const node = queue.shift();
      if (!node) return;

      if (searchFn(node)) return node;
      checked.add(node);

      for (const connected of node.connectedTo.values()) {
        if (!checked.has(connected)) queue.push(connected);
      }
    }
  }

  private emitUpdate () {
    const updated = new Set<Connection>();

    const queue = new Array<Connection>();
    queue.push(this);

    while (queue.length >= 1) {
      const node = queue.shift();
      if (!node) return;

      node.update();
      updated.add(node);

      for (const connected of node.connectedTo.values()) {
        if (!updated.has(connected)) queue.push(connected);
      }
    }
  }
}
