import { Connection } from './Connection';

export class Diode {
  public readonly positivePin = new Connection();
  public readonly negativePin = new Connection();

  constructor () {
    this.negativePin.connectOneWay(this.positivePin);
  }

  public get powered () {
    return this.amps >= 1;
  }

  public get amps () {
    const closedCircuit = this.positivePin.isConnectedTo(this.negativePin);
    if (closedCircuit) return this.negativePin.amps;
    return 0;
  }

  public toString () {
    return [
      this.negativePin,
      '▷|',
      this.positivePin,
    ].join('');
  }
}
