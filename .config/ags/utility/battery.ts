import { readFile, readFileAsync, Variable } from 'astal';

const POWER_DEVICE = 'BAT0';

const percentage = Variable(100);
percentage.poll(
  1000,
  async () => parseInt(await readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/capacity`))
);

const isCharging = Variable(false);
isCharging.poll(
  1000,
  async () => {
    const data = await readFileAsync(`/sys/class/power_supply/${POWER_DEVICE}/status`);
    return data.trim() !== 'Discharging';
  }
);

const energyRate = Variable(0);
energyRate.poll(
  1000,
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
