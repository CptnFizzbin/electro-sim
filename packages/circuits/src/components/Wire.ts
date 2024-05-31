import { Connection } from './Connection';

export class Wire extends Connection {
  public static from (source: Connection) {
    return new Wire().connect(source);
  }

  public static connect (...targets: Connection[]): Wire {
    return new Wire().connect(...targets);
  }

  public to (...targets: Connection[]): Wire {
    this.connect(...targets);
    return this;
  }
}
