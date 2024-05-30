import { Connection } from './Wire';

export class LightBulb {
  public readonly connections = {
    positive: new Connection(),
    negative: new Connection(),
  };
}
