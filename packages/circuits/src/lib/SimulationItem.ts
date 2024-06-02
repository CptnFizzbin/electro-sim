export interface SimulationItem {
  name: string;

  onSimStartUpdate? (): void;

  onSimUpdate? (): void;

  onSimEndUpdate? (): void;
}
