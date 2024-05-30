import { Connection } from './Wire';

export class Switch {
  public readonly connections = {
    input: new Connection(),
    closed: new Connection(),
    open: new Connection(),
  };
}
