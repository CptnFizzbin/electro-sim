import { Simulation } from '../lib';
import { createPlaygroundCircuit } from './playground';

let updates = 0;
let circuit: ReturnType<typeof createPlaygroundCircuit>;

new Simulation()
  .edit(() => {
    circuit = createPlaygroundCircuit();
  })
  .addUpdateListener(() => {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
    process.stdout.write(new Date().toISOString() + '\n');
    circuit.diagram.render();

    if (updates % 6 === 0) circuit.switchA.toggle();
    if (updates % 8 === 0) circuit.switchB.toggle();
    if (updates % 10 === 0) circuit.switchO.toggle();

    updates += 1;
  })
  .start();
