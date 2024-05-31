import { Battery } from '../components/Battery';
import { Switch } from '../components/Switch';
import { LightBulb } from '../components/LightBulb';

import { Wire } from '../components/Wire';
import * as process from 'node:process';

const ground = new Wire();
const battery = new Battery(5);
const switchA = new Switch();
const switchB = new Switch();
const lightA = new LightBulb();
const lightB = new LightBulb();

ground.connect(
  battery.negativePin,
  lightA.positivePin,
  lightB.positivePin,
);

battery.positivePin.connect(
  switchA.inputPin,
  switchB.inputPin,
);

switchA.closedPin.connect(
  lightA.negativePin,
);

switchB.closedPin.connect(
  lightB.negativePin,
);

setInterval(() => {
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();

  process.stdout.write([
    new Date().toISOString(),
    `╭─${battery}─┬──${switchA}───${lightA}───╮`,
    `|                   └──${switchB}───${lightB}───┤`,
    `╰──────────────────────────────────────────────────────╯`,
  ].join('\n'));
}, 100);

setInterval(() => switchA.toggle(), 3000);
setInterval(() => switchB.toggle(), 1000);
