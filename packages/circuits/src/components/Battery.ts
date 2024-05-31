import { PowerSource } from './PowerSource';

export class Battery extends PowerSource {
  public toString (): string {
    return [
      this.negativePin,
      `[-   +]`,
      this.positivePin,
    ].join('');
  }
}
