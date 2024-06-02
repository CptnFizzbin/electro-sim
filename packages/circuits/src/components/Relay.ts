import { CircuitNode } from '../lib';
import { Switch, SwitchState } from './Switch';

export class Relay {
  public readonly energizePin = new CircuitNode();
  public readonly groundPin = new CircuitNode();

  private readonly switches = new Array<Switch>();

  constructor (
    private readonly defaultState: SwitchState = SwitchState.OPEN,
  ) {
    this.energizePin.connect(this.groundPin);
    this.update();
  }

  public getSwitch (index: number): Switch {
    return this.switches[index] ||= new Switch();
  }

  private update () {
    const powered = this.energizePin.amps >= 5;
    const isClosed = this.defaultState === SwitchState.OPEN
      ? powered
      : !powered;

    this.switches.forEach((relaySwitch) => {
      isClosed ? relaySwitch.close() : relaySwitch.open();
    });
  }
}
