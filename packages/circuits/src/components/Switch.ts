import { Connection } from './Connection';
import { Wire } from './Wire';

export enum SwitchState {
  OPEN,
  CLOSED,
}

export class Switch {
  public readonly inputPin = new Connection();
  public readonly closedPin = new Connection();
  public readonly openPin = new Connection();

  protected state: SwitchState;
  private bridge = new Wire();

  constructor (defaultState: SwitchState = SwitchState.OPEN) {
    this.state = defaultState;
    this.bridge.connect(this.inputPin, this.openPin);
  }

  public get isOpen (): boolean {
    return this.state === SwitchState.OPEN;
  }

  public get isClosed (): boolean {
    return !this.isOpen;
  }

  public toggle (): this {
    this.isOpen ? this.close() : this.open();
    return this;
  }

  public open (): this {
    if (this.isOpen) return this;

    this.bridge
      .disconnect(this.openPin, this.closedPin)
      .connect(this.openPin);

    this.state = SwitchState.OPEN;

    return this;
  }

  public close (): this {
    if (this.isClosed) return this;

    this.bridge
      .disconnect(this.openPin, this.closedPin)
      .connect(this.closedPin);

    this.state = SwitchState.CLOSED;

    return this;
  }

  public toString (): string {
    return [
      this.inputPin,
      this.isOpen ? '═╱═' : '═══',
      this.closedPin,
    ].join('');
  }
}
