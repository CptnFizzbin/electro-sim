import { CircuitNode, makeId, Simulation, SimulationItem } from '../lib';

export class LightBulb implements SimulationItem {
  public readonly positivePin: CircuitNode;
  public readonly negativePin: CircuitNode;

  constructor (
    public readonly name: string = `LightBulb-${makeId()}`,
  ) {
    this.positivePin = new CircuitNode(`${name}[+]`);
    this.negativePin = new CircuitNode(`${name}[-]`);

    this.negativePin.connect(this.positivePin);

    Simulation.add(this);
  }

  public get isLit () {
    return this.negativePin.amps >= 1;
  }

  public get isUnlit () {
    return !this.isLit;
  }

  public toString () {
    return this.isLit ? '─(*)─' : '─( )─';
  }

  public onSimEndUpdate () {

  }
}
