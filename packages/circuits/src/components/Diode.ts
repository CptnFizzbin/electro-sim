import { Connection } from './Connection';

export class Diode {
  public readonly positivePin = new Connection();
  public readonly negativePin = new Connection();

  constructor () {
    this.negativePin.connectOneWay(this.positivePin);
  }

  get amps () {
    const closedCircuit = this.positivePin.isConnectedTo(this.negativePin);
    if (closedCircuit) return this.negativePin.amps;
    return 0;
  }

  static connect (source: Connection, target: Connection): Diode {
    const diode = new Diode();
    diode.positivePin.connect(source);
    diode.negativePin.connect(target);
    return diode;
  }

  public emitCurrent (amps: number) {
    this.positivePin.emitCurrent(amps);
  }

  public toString () {
    return [
      this.negativePin,
      '▷|',
      this.positivePin,
    ].join('');
  }
}
