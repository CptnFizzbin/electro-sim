import { Simulation } from '../lib';
import { LightBulb, Switch } from '../components';
import { Battery } from '../components/Battery';
import { createPlaygroundCircuit } from '../circuits/playground';

test('basic circuit', () => {
  let light: LightBulb | null = null;

  const simulation = new Simulation().edit(() => {
    const battery = new Battery();
    light = new LightBulb();

    battery.positivePin.connect(light.negativePin);
    light.positivePin.connect(battery.negativePin);
  });

  simulation.update();
  expect(light!.isLit).toBe(true);
});

test('switched light', () => {
  const simulation = new Simulation().open();

  const battery = new Battery();
  const switch1 = new Switch();
  const light = new LightBulb();

  battery.positivePin.connect(switch1.inputPin);
  switch1.closedPin.connect(light.negativePin);
  light.positivePin.connect(battery.negativePin);

  simulation.close();

  switch1.open();
  simulation.update();
  expect(light.isLit).toBe(false);

  switch1.close();
  simulation.update();
  expect(light.isLit).toBe(true);

  switch1.open();
  simulation.update();
  expect(light.isLit).toBe(false);
});

test('complex light circuit', () => {
  let circuit: ReturnType<typeof createPlaygroundCircuit>;
  const simulation = new Simulation().edit(() => {
    circuit = createPlaygroundCircuit();
  });

  const {
    switchA,
    switchB,
    switchO,
    lightA,
    lightB,
    lightC,
  } = circuit!;

  switchA.close();
  switchB.close();
  switchO.close();
  simulation.update();
  expect(lightA.isLit).toBe(true);
  expect(lightB.isLit).toBe(false);
  expect(lightC.isLit).toBe(true);

  switchA.open();
  switchB.close();
  switchO.close();
  simulation.update();
  expect(lightA.isLit).toBe(false);
  expect(lightB.isLit).toBe(true);
  expect(lightC.isLit).toBe(true);

  switchA.open();
  switchB.close();
  switchO.close();
  simulation.update();
  expect(lightA.isLit).toBe(false);
  expect(lightB.isLit).toBe(true);
  expect(lightC.isLit).toBe(true);

  switchA.close();
  switchB.close();
  switchO.open();
  simulation.update();
  expect(lightA.isLit).toBe(false);
  expect(lightB.isLit).toBe(false);
  expect(lightC.isLit).toBe(false);
});
