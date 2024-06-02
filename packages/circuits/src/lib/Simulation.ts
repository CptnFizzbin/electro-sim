import { SimulationItem } from './SimulationItem';

export class Simulation {
  static openedSim: Simulation | null;
  public updateTime: bigint = BigInt(0);
  private loopTask: ReturnType<typeof setTimeout> | null = null;
  private readonly items = new Set<SimulationItem>();
  private readonly updateListeners = new Set<() => void>();

  public static open (simulation: Simulation) {
    if (this.openedSim) { throw new Error('A simulation is already open for editing.'); }
    this.openedSim = simulation;
  }

  public static edit (simulation: Simulation, editor: () => void) {
    this.open(simulation);
    editor();
    this.close();
  }

  public static close () {
    this.openedSim = null;
  }

  public static getCurrent () {
    if (!this.openedSim) {
      throw new Error('Not currently editing a simulation. Did you call `.open()`?');
    }

    return this.openedSim;
  }

  public static add (node: SimulationItem) {
    this.getCurrent().add(node);
    return this;
  }

  public open () {
    Simulation.open(this);
    return this;
  }

  public edit (editor: () => void) {
    Simulation.edit(this, editor);
    return this;
  }

  public close () {
    Simulation.close();
    return this;
  }

  public add (node: SimulationItem) {
    this.items.add(node);
    return this;
  }

  public start () {
    this.loopTask = setInterval(() => this.update(), 100);
    return this;
  }

  public stop () {
    if (this.loopTask) clearInterval(this.loopTask);
    this.loopTask = null;
    return this;
  }

  public addUpdateListener (listener: () => void) {
    this.updateListeners.add(listener);
    return this;
  }

  public update () {
    this.items.forEach((item) => {
      if (item.onSimStartUpdate) item.onSimStartUpdate();
    });

    this.items.forEach((item) => {
      if (item.onSimUpdate) item.onSimUpdate();
    });

    this.items.forEach((item) => {
      if (item.onSimEndUpdate) item.onSimEndUpdate();
    });

    this.updateListeners.forEach((listener) => listener());
  }
}
