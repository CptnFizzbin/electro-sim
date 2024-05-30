import { Diode } from './Diode';

export class LightBulb extends Diode {
  public get isLit () {
    return this.positivePin.amps >= 1;
  }

  public get isUnlit () {
    return !this.isLit;
  }
}
