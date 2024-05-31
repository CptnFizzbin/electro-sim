import { Battery } from '../components/Battery';
import { Switch } from '../components/Switch';
import { LightBulb } from '../components/LightBulb';

import { Wire } from '../components/Wire';
import * as process from 'node:process';

const battery = new Battery(5);
const switchA = new Switch();
const switchB = new Switch();
const switchC = new Switch();
const lightA = new LightBulb();
const lightB = new LightBulb();
const lightC = new LightBulb();

const w1 = Wire.from(battery.positivePin).to(
  switchA.inputPin,
  switchB.inputPin,
);

const w2 = Wire.from(switchA.closedPin).to(
  lightA.negativePin,
);

const w3 = Wire.from(switchA.openPin).to(
  lightC.negativePin,
);

const w4 = Wire.from(switchB.closedPin).to(
  lightB.negativePin,
);

const w5 = Wire.connect(
  lightA.positivePin,
  lightB.positivePin,
  lightC.positivePin,
  switchC.closedPin,
);

const w6 = Wire.connect(
  switchC.inputPin,
  battery.negativePin,
);

setInterval(() => {
  process.stdout.cursorTo(0, 0);
  process.stdout.clearScreenDown();

  process.stdout.write([
    new Date().toISOString(),
    `╭─${battery}─${w1}─┬─${w1}─${switchA}──${w2}──${lightA}──${w5}──╮`,
    `|                 │        ╙───${w3}──${lightC}──${w5}──┤`,
    `|                 └─${w1}─${switchB}──${w4}──${lightB}──${w5}──┤`,
    `╰──${w6}─────────${switchC}───────────────────────${w5}──╯`,
  ].join('\n'));
}, 100);

setInterval(() => switchA.toggle(), 1000);
setInterval(() => switchB.toggle(),  600);
setInterval(() => switchC.toggle(), 1300);
