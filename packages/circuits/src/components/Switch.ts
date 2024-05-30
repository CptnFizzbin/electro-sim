import { Connection } from './Connection';
import { Wire } from './Diode';
import { logger } from '../logger';

export class Switch {
  public readonly inputPin = new Connection();
  public readonly closedPin = new Connection();
  public readonly openPin = new Connection();

  protected state: 'open' | 'closed';
  private bridge = new Wire();

  constructor () {
    this.state = 'open';
    this.bridge.connect(this.inputPin, this.openPin);
  }

  public open () {
    logger.info('*click* Open');

    this.bridge
      .disconnect(this.openPin, this.closedPin)
      .connect(this.openPin);

    return this;
  }

  public close () {
    logger.info('*click* Closed');

    this.bridge
      .disconnect(this.openPin, this.closedPin)
      .connect(this.closedPin);

    return this;
  }
}
