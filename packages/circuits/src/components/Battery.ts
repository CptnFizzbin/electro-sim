import { Diode } from './Diode';

export class Battery extends Diode {
  constructor () {
    super();
    this.positivePin.emitCurrent(5);
  }
}
