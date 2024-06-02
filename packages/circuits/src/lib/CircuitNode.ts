import { Simulation } from './Simulation';
import { SimulationItem } from './SimulationItem';
import { makeId } from './MakeId';

export class CircuitNode implements SimulationItem {
  public amps: number = 0;
  private readonly connectedTo = new Set<CircuitNode>();

  constructor (
    public name: string = makeId(5),
  ) {
    Simulation.add(this);
  }

  public get connected () {
    return [...this.connectedTo.values()];
  }

  public get isPowered () {
    return this.amps >= 1;
  }

  public onSimStartUpdate () {
    this.amps = 0;
  }

  public connectOneWay (...targets: CircuitNode[]) {
    targets.forEach((target) => this.connectedTo.add(target));
    return this;
  }

  public connect (...targets: CircuitNode[]) {
    targets.forEach((target) => {
      this.connectOneWay(target);
      target.connectOneWay(this);
    });

    return this;
  }

  public disconnect (...targets: CircuitNode[]) {
    targets.forEach((target) => {
      this.connectedTo.delete(target);
      target.connectedTo.delete(this);
    });

    return this;
  }

  public toString (): string {
    return this.isPowered ? `──↯──` : `──.──`;
  }
}
