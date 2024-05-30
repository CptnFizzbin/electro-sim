import { Connection } from './Wire';

export class Battery {
  public readonly connections = {
    positive: new Connection(),
    negative: new Connection(),
  };
}
