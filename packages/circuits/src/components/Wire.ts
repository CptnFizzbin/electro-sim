export class Connection {
  public connectTo(...targets: Connection[]) {

  }
}

export class Wire {
  private readonly connections = new Set<Connection>();

  static connect (...targets: Connection[]) {
    const wire = new Wire();
    targets.map((target) => wire.connectTo(target));
    return wire;
  }

  public connectTo (target: Connection) {
    this.connections.add(target);
    return this;
  }

  public disconnectFrom (target: Connection) {
    this.connections.delete(target);
    return this;
  }
}
