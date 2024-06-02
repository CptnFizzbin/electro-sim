import { LightBulb, Switch, SwitchState } from '../components';
import { Diagram } from '../lib';
import { Battery } from '../components/Battery';

export function createPlaygroundCircuit () {
  const battery = new Battery('battery', 5);
  const switchA = new Switch('switchA', SwitchState.CLOSED);
  const switchB = new Switch('switchB', SwitchState.CLOSED);
  const switchO = new Switch('switchC', SwitchState.CLOSED);
  const lightA = new LightBulb('lightA');
  const lightB = new LightBulb('lightB');
  const lightC = new LightBulb('lightC');

  battery.positivePin.connect(
    switchA.inputPin,
    switchB.inputPin,
  );

  switchA.closedPin.connect(
    lightA.negativePin,
  );

  switchA.openPin.connect(
    lightB.negativePin,
  );

  switchB.closedPin.connect(
    lightC.negativePin,
  );

  switchO.inputPin.connect(
    lightA.positivePin,
    lightB.positivePin,
    lightC.positivePin,
  );

  switchO.closedPin.connect(
    battery.negativePin,
  );

  const diagram = new Diagram(
    [
      `─>────┬─────$SW-A──────$LI-A─────╮`,
      `      │       ╙────────$LI-B─────┤`,
      `      └─────$SW-B──────$LI-C─────┤`,
      `─<──────────$SW-O────────────────╯`,
    ].join('\n'),
    {
      'SW-A': switchA,
      'SW-B': switchB,
      'SW-O': switchO,
      'LI-A': lightA,
      'LI-B': lightB,
      'LI-C': lightC,
    },
  );

  return {
    diagram,
    battery,
    switchA,
    switchB,
    switchO,
    lightA,
    lightB,
    lightC,
  };
}
