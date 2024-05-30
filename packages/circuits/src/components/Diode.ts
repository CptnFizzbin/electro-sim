import { Connection } from './Connection';

export class Diode {
  public readonly positivePin = new Connection();
  public readonly negativePin = new Connection();

  constructor () {
    this.positivePin.connect(this.negativePin);
  }
}

export class Wire extends Connection {
  connect (...targets: Connection[]) {
    targets.forEach((target) => {
      super.connect(target);
      target.connect(this);
    });

    return this;
  }

  disconnect (...targets: Connection[]) {
    targets.forEach((target) => {
      super.connect(target);
      target.connect(this);
    });

    return this;
  }
}
