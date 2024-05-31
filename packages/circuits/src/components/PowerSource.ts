import { allConnections } from './Connection';
import { Diode } from './Diode';

export class PowerSource extends Diode {
  readonly #amps: number;

  constructor (amps: number) {
    super();
    this.#amps = amps;
    setInterval(() => this.update());
  }

  public toString (): string {
    return this.positivePin.toString();
  }

  private update () {
    const closedCircuit = this.positivePin.isConnectedTo(this.negativePin);
    this.positivePin.emitCurrent(closedCircuit ? this.#amps : 0);
    allConnections.forEach((connection) => connection.update());
  }
}
