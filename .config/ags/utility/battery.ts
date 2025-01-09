import { Variable } from 'astal';

const POWER_DEVICE = 'BAT0';

const percentage = Variable(100);
percentage.poll(
  1000,
  `cat /sys/class/power_supply/${POWER_DEVICE}/capacity`,
  (data: string) => parseInt(data)
);

const isCharging = Variable(false);
isCharging.poll(
  1000,
  `cat /sys/class/power_supply/${POWER_DEVICE}/status`,
  (data: string) => data !== 'Discharging'
);

const energyRate = Variable(0);
energyRate.poll(
  1000,
  ['zsh', '-c', `echo $(( $(cat /sys/class/power_supply/${POWER_DEVICE}/voltage_now) * $(cat /sys/class/power_supply/${POWER_DEVICE}/current_now) / 1000000000000 ))`],
  (data: string) => parseInt(data)
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
