import { Variable } from 'astal';
import { Gdk } from 'astal/gtk4';

const POWER_DEVICE = 'BAT0'

export const percentage = Variable(100).poll(
  1000, `cat /sys/class/power_supply/${POWER_DEVICE}/capacity`,
  (data: string) => parseInt(data)
);

export const isCharging = Variable(true).poll(
  1000, `cat /sys/class/power_supply/${POWER_DEVICE}/status`,
  (data: string) => data !== 'Discharging'
);

export const energyRate = Variable(0).poll(
  1000, ['zsh', '-c', `echo $(( $(cat /sys/class/power_supply/${POWER_DEVICE}/voltage_now) * $(cat /sys/class/power_supply/${POWER_DEVICE}/current_now) / 1000000000000 ))`],
  (data: string) => parseInt(data)
);

enum InfoState {
  Percentage,
  Consumption
}

export default () => {
  const infoState = Variable(InfoState.Percentage);

  const batteryIcon = Variable.derive([percentage, isCharging], (percentage, isCharging) => {
    if (isCharging) return '󰂄';
    if (percentage <= 0.25) return '󰂃';
    return '󰁹';
  });

  const infoLabelMap = {
    [InfoState.Percentage]: <label>{percentage(percentage => `${percentage}%`)}</label>,
    [InfoState.Consumption]: <label>{energyRate(energyRate => `${energyRate}W`)}</label>
  };

  const onClick = (_: any, event: Gdk.ButtonEvent): void => {
    if (event.get_button() !== Gdk.BUTTON_PRIMARY) return;

    if (infoState.get() === InfoState.Percentage) infoState.set(InfoState.Consumption)
    else infoState.set(InfoState.Percentage);
  };

  return (
    <box
      onButtonReleased={onClick}
      onDestroy={() => batteryIcon.drop()}
      spacing={3}
    >
      <label>{batteryIcon()}</label>
      {infoState(state => infoLabelMap[state])}
    </box>
  );
};
