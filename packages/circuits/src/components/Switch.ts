import { CircuitNode, makeId, Simulation, SimulationItem } from '../lib';

export enum SwitchState {
  OPEN,
  CLOSED,
}

export class Switch implements SimulationItem {
  public readonly inputPin: CircuitNode;
  public readonly closedPin: CircuitNode;
  public readonly openPin: CircuitNode;
  private readonly bridge: CircuitNode;

  #state: SwitchState;

  constructor (
    public readonly name: string = `Switch-${makeId()}`,
    private defaultState: SwitchState = SwitchState.OPEN,
  ) {
    Simulation.add(this);

    this.inputPin = new CircuitNode(`${name}[I]`);
    this.closedPin = new CircuitNode(`${name}[C]`);
    this.openPin = new CircuitNode(`${name}[O]`);
    this.bridge = new CircuitNode(`${name}[B]`);

    this.inputPin.connect(this.bridge);

    this.state = defaultState;
    this.#state = defaultState;
  }

  get state (): SwitchState {
    return this.#state;
  }

  set state (value: SwitchState) {
    if (value === this.#state) return;

    this.bridge.disconnect(this.openPin, this.closedPin);

    if (value === SwitchState.OPEN) {
      this.bridge.connect(this.openPin);
    } else {
      this.bridge.connect(this.closedPin);
    }

    this.#state = value;
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
    this.state = SwitchState.OPEN;
    return this;
  }

  public close (): this {
    this.state = SwitchState.CLOSED;
    return this;
  }

  public toString (): string {
    return this.isOpen ? '─═╗ ─' : '─═══─';
  }

  public onSimEndUpdate () {

  }
}
