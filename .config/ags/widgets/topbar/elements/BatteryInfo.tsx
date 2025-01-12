import { battery } from '@/utility/battery';
import { Variable } from 'astal';

import Icon from '@/widgets/icon/Icon';

enum BatteryInfoState {
  Percentage,
  Consumption
};

const PrecentageInfo = () => {
  return (
    <label>
      {battery(({ percentage }) => `${percentage}%`)}
    </label>
  );
};

const ConsumptionInfo = () => {
  return (
    <label>
      {battery(({ energyRate }) => `${energyRate.toFixed()}W`)}
    </label>
  );
};

export default () => {
  const infoState = Variable(BatteryInfoState.Percentage);

  const batteryIconBind = battery(({ percentage, isCharging }) => {
    if (isCharging) return '󰂄';
    if (percentage <= 0.25) return '󰂃';
    return '󰁹';
  });

  const onClick = () => {
    infoState.set((infoState.get() + 1) % (Object.keys(BatteryInfoState).length / 2));
  };

  return (
    <eventbox onClickRelease={onClick}>
      <box spacing={3}>
        <Icon icon={batteryIconBind}/>
        {infoState(state => {
          switch (state) {
            case BatteryInfoState.Percentage:
              return <PrecentageInfo/>;
            case BatteryInfoState.Consumption:
              return <ConsumptionInfo/>;
          }
        })}
      </box>
    </eventbox>
  );
};
