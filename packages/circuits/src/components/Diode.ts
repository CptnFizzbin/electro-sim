import { CircuitNode, makeId } from '../lib';

export class Diode {
  public readonly positivePin: CircuitNode;
  public readonly negativePin: CircuitNode;

  constructor (
    public readonly name: string = `Diode-${makeId()}`,
    private readonly direction: 'left' | 'right' = 'right',
  ) {
    this.positivePin = new CircuitNode(`${name}[+]`)
    this.negativePin = new CircuitNode(`${name}[-]`)
    this.negativePin.connectOneWay(this.positivePin);
  }

  public toString (): string {
    return this.direction === 'right' ? '─▷|─' : '─|◁─';
  }
}
