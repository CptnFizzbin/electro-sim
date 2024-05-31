import { Battery } from '../components/Battery';
import { Switch } from '../components/Switch';
import { LightBulb } from '../components/LightBulb';

import { Wire } from '../components/Wire';
import * as process from 'node:process';

const battery = new Battery(5);
const switchA = new Switch();
const switchB = new Switch();
const lightA = new LightBulb();
const lightB = new LightBulb();
const lightC = new LightBulb();

Wire.from(battery.positivePin).to(
  switchA.inputPin,
  switchB.inputPin,
);

Wire.from(switchA.closedPin).to(
  lightA.negativePin,
);

Wire.from(switchA.openPin).to(
  lightC.negativePin,
);

Wire.from(switchB.closedPin).to(
  lightB.negativePin,
);

Wire.connect(
  lightA.positivePin,
  lightB.positivePin,
  lightC.positivePin,
  battery.negativePin,
);

setInterval(() => {
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();

  process.stdout.write([
    new Date().toISOString(),
    `╭─${battery}─┬──${switchA}───${lightA}───╮`,
    `|                   │        ╙─────────${lightC}───┤`,
    `|                   └──${switchB}───${lightB}───┤`,
    `╰──────────────────────────────────────────────────────╯`,
  ].join('\n'));
}, 100);

setInterval(() => switchA.toggle(), 3000);
setInterval(() => switchB.toggle(), 1000);
