type ChangeHandler = () => void

export const allConnections = new Set<Connection>();

export class Connection {
  private readonly connectedTo = new Set<Connection>();
  private readonly handlers = new Set<ChangeHandler>();
  #sourceAmps = 0;
  #amps = 0;

  constructor () {
    allConnections.add(this);
  }

  public get sourceAmps () {
    return this.#sourceAmps;
  }

  public get amps () {
    return this.#amps;
  }

  public get isConnectedToPowerSource () {
    return !!this.getPowerSource();
  }

  public get isPowerSource () {
    return this.#sourceAmps >= 1;
  }

  public emitCurrent (amps: number) {
    this.#sourceAmps = amps;
  }

  public getPowerSource () {
    return this.findNode((node) => node.isPowerSource && node.isConnectedTo(this));
  }

  public update () {
    const powerSource = this.getPowerSource();
    this.#amps = powerSource ? powerSource.sourceAmps : 0;

    this.handlers.forEach((handler) => handler());
  }

  public onChange (handler: ChangeHandler) {
    this.handlers.add(handler);
  }

  public isConnectedTo (target: Connection): boolean {
    return !!this.findNode((node) => node === target);
  }

  public connectOneWay (...targets: Connection[]) {
    targets.forEach((target) => this.connectedTo.add(target));
    return this;
  }

  public connect (...targets: Connection[]) {
    targets.forEach((target) => {
      this.connectOneWay(target);
      target.connectOneWay(this);
    });

    return this;
  }

  public disconnect (...targets: Connection[]) {
    targets.forEach((target) => {
      this.connectedTo.delete(target);
      target.connectedTo.delete(this);
    });

    return this;
  }

  public toString () {
    if (this.isPowerSource) return `─!↯!─`;
    if (this.isConnectedToPowerSource) return `──↯──`;
    return `──.──`;
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
}
