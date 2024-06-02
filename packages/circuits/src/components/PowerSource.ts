import { makeId, Simulation, SimulationItem } from '../lib';
import { Diode } from './Diode';
import { DirectedGraph } from '../lib/DirectedGraph';

export class PowerSource extends Diode implements SimulationItem {
  public readonly amps: number = 5;

  constructor (
    public readonly name: string = `PowerSource-${makeId()}`,
    amps: number = 5,
  ) {
    super(name);
    Simulation.add(this);
    this.amps = amps;
  }

  public onSimUpdate () {
    const graph = DirectedGraph.create(this.positivePin, (node) => {
      return Array.from(node.connected.values());
    });

    if (!graph.has(this.negativePin)) {
      console.debug('Not a closed circuit');
      return;
    }

    for (const node of graph.keys()) {
      if (graph.areLinked(node, this.negativePin)) {
        node.amps += this.amps;
      }
    }
  }

  public toString (): string {
    return this.positivePin.toString();
  }
}
