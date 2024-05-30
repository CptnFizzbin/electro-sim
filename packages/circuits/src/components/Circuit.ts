import { Connection } from './Connection';

export class Circuit {
  static connect (...targets: Connection[]) {
    return new Connection().connect(...targets);
  }

  static isClosed (positive: Connection, negative: Connection): boolean {
    return positive.isConnectedTo(negative)
  }
}
