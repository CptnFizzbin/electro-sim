import process from 'node:process';

type Renderable = string | { toString (): string }

export class Diagram {
  private mapping: Map<string, Renderable> = new Map();

  constructor (
    private readonly template: string,
    mappings: Record<string, Renderable>,
  ) {
    for (const key in mappings) {
      const renderable = mappings[key];
      this.map(key, renderable);
    }
  }

  public map (key: string, node: Renderable) {
    if (key.length !== 4) console.warn('Key length is recommended to be 4 characters');
    this.mapping.set(key, node);
  }

  render () {
    let rendered = this.template;

    for (const [key, node] of this.mapping.entries()) {
      rendered = rendered.replace(`$${key}`, node.toString());
    }

    process.stdout.write(rendered);
  }
}
