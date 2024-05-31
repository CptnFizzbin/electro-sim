import { allConnections } from './Connection';
import { Diode } from './Diode';

export class PowerSource extends Diode {
  #amps: number;

  constructor (amps: number) {
    super();
    this.#amps = amps;
    setInterval(() => this.update());
  }

  private update () {
    const closedCircuit = this.positivePin.isConnectedTo(this.negativePin);
    this.emitCurrent(closedCircuit ? this.#amps : 0);
    allConnections.forEach((connection) => connection.update());
  }
}
