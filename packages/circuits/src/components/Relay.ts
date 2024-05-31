import { Connection } from './Connection';
import { Switch, SwitchState } from './Switch';
import { Diode } from './Diode';

export class Relay {
  public readonly energizePin = new Connection();
  public readonly groundPin = new Connection();

  private readonly switches = new Array<Switch>();

  private readonly defaultState: SwitchState;

  constructor () {
    const diode = new Diode()

    this.energizePin = diode.positivePin
    this.groundPin = diode.negativePin
  }

  constructor (
    defaultStage: SwitchState = SwitchState.OPEN,
  ) {
    this.defaultState = defaultStage;

    this.energizePin
      .connect(this.groundPin)
      .onChange(() => this.update());

    this.update();
  }

  public getSwitch (index: number): Switch {
    return this.switches[index] ||= new Switch();
  }

  private update () {
    const powered = this.energizePin.amps >= 5;

    this.switches.forEach((relaySwitch) => {
      if (powered) {
        this.defaultState === SwitchState.CLOSED
          ? relaySwitch.open()
          : relaySwitch.close();
      } else {
        this.defaultState === SwitchState.OPEN
          ? relaySwitch.open()
          : relaySwitch.close();
      }
    });
  }
}
