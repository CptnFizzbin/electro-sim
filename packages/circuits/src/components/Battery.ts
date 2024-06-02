import { PowerSource } from './PowerSource';
import { makeId } from '../lib';

export class Battery extends PowerSource {
  constructor (
    public readonly name: string = `Battery-${makeId()}`,
    amps: number = 5,
  ) {
    super(name, amps);
  }

  public toString (): string {
    return '[- +]';
  }
}
