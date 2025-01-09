import { battery } from '@/utility/battery';
import { Variable } from 'astal';
import { Gdk } from 'astal/gtk4';

enum BatteryInfoState {
  Percentage,
  Consumption
};

export default () => {
  const infoState = Variable(BatteryInfoState.Percentage);

  const batteryIconBind = battery(({ percentage, isCharging}) => {
    if (isCharging) return '󰂄';
    if (percentage <= 0.25) return '󰂃';
    return '󰁹';
  });

  const infoLabelMap = {
    [BatteryInfoState.Percentage]: <label>{battery(({ percentage }) => `${percentage}%`)}</label>,
    [BatteryInfoState.Consumption]: <label>{battery(({ energyRate }) => `${energyRate}W`)}</label>
  };

  const onClick = (_: any, event: Gdk.ButtonEvent): void => {
    if (event.get_button() !== Gdk.BUTTON_PRIMARY) return;

    if (infoState.get() === BatteryInfoState.Percentage) infoState.set(BatteryInfoState.Consumption)
    else infoState.set(BatteryInfoState.Percentage);
  };

  return (
    <box
      onButtonReleased={onClick}
      spacing={3}
    >
      <label>{batteryIconBind}</label>
      {infoState(state => infoLabelMap[state])}
    </box>
  );
};
