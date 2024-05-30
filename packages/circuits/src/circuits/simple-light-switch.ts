import { Battery } from '../components/Battery';
import { Switch } from '../components/Switch';
import { LightBulb } from '../components/LightBulb';
import { logger } from '../logger';
import { Wire } from '../components/Diode';

const ground = new Wire();
const battery = new Battery();
const switchA = new Switch();
const switchB = new Switch();
const light = new LightBulb();

battery.positivePin.connect(ground);
battery.negativePin.connect(switchA.inputPin);
switchA.closedPin.connect(switchB.inputPin);
switchB.closedPin.connect(light.positivePin);
light.negativePin.connect(ground);


logger.info(`Light off? ${light.isUnlit}`);

switchA.close();
logger.info(`Light off? ${light.isUnlit}`);

switchB.close();
logger.info(`Light on? ${light.isUnlit}`);

switchA.open();
logger.info(`Light off? ${light.isUnlit}`);
