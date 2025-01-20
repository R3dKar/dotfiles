import { readFileAsync, Variable } from 'astal';

const POWER_DEVICE = 'BAT0';
const POLLING_INTERVAL = 1000;

export const percentage = Variable(100);
percentage.poll(
  POLLING_INTERVAL,
  async () => {
    const data = await readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/capacity`);
    return Math.min(100, parseInt(data));
  }
);

export const isCharging = Variable(false);
isCharging.poll(
  POLLING_INTERVAL,
  async () => {
    const data = await readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/status`);
    return data.trim() !== 'Discharging';
  }
);

export const energyRate = Variable(0);
energyRate.poll(
  POLLING_INTERVAL,
  async () => {
    const [voltage, current] = await Promise.all([
      readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/voltage_now`),
      readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/current_now`)
    ]);

    return parseInt(voltage) * parseInt(current) / 1e12;
  }
);


export interface BatteryData {
  percentage: number,
  isCharging: boolean,
  energyRate: number
};

export const battery: Variable<BatteryData> = Variable.derive(
  [percentage, isCharging, energyRate],
  (percentage, isCharging, energyRate) => ({ percentage, isCharging, energyRate })
);
