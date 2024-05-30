import { Battery } from '../components/Battery';
import { Switch } from '../components/Switch';
import { LightBulb } from '../components/LightBulb';
import { Wire } from '../components/Wire';

const battery = new Battery()
const lightSwitch = new Switch()
const light = new LightBulb()

battery.connections.negative
  .connectTo(lightSwitch.connections.input);

lightSwitch.connections.closed
  .connectTo(light.connections.negative)
