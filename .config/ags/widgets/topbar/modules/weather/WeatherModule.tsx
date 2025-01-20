import { location } from '@/services/location';
import { ServiceStatus } from '@/services/service';
import { Precipitation, weather } from '@/services/weather';
import { Variable } from 'astal';

import Icon from '@/widgets/icon/Icon';

enum WeatherTemperatureState {
  Real,
  Feel
};

const RealTemperatureInfo = () => {
  return (
    <label>
      {weather(weather => {
        if (weather.status === ServiceStatus.Unavailable) return '';

        return `${weather.temperature.real.toFixed()}°C`;
      })}
    </label>
  );
};

const FeelTemperatureInfo = () => {
  return (
    <label>
      {weather(weather => {
        if (weather.status === ServiceStatus.Unavailable) return '';

        return `≈${weather.temperature.feel.toFixed()}°C`;
      })}
    </label>
  );
};

export default () => {
  const availableBind = weather(({ status }) => status === ServiceStatus.Available);

  const cityBind = location(location => {
    if (location.status === ServiceStatus.Unavailable) return '';

    return location.city;
  });

  const weatherIconBind = weather(weather => {
    if (weather.status === ServiceStatus.Unavailable) return '';

    if (weather.death) return '💀';

    const precipitationIconMap = {
      [Precipitation.Rain]: '',
      [Precipitation.Thunderstorm]: '󱐋',
      [Precipitation.Snow]: ''
    };
    if (weather.precipitation !== Precipitation.None) return precipitationIconMap[weather.precipitation];

    if (weather.clouds > 25) return '󰖐';

    return '';
  });

  const temperatureState = Variable(WeatherTemperatureState.Real);

  const onClick = () => {
    temperatureState.set((temperatureState.get() + 1) % (Object.keys(WeatherTemperatureState).length / 2));
  };

  return (
    <eventbox
      onClickRelease={onClick}
      visible={availableBind}
      hasTooltip={location(({ status }) => status === ServiceStatus.Available)}
      tooltipText={cityBind}
      cursor='pointer'
    >
      <box spacing={3}>
        <Icon icon={weatherIconBind}/>
        {temperatureState(state => {
          switch (state) {
            case WeatherTemperatureState.Real:
              return <RealTemperatureInfo/>;
            case WeatherTemperatureState.Feel:
              return <FeelTemperatureInfo/>;
          }
        })}
      </box>
    </eventbox>
  );
};
