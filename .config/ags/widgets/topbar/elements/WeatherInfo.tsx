import { ServiceStatus } from '@/utility/service';
import { Precipitation, weather } from '@/utility/weather';
import { Variable } from 'astal';
import { Gdk } from 'astal/gtk4';

enum WeatherTemperatureState {
  Real,
  Feel
};

export default () => {
  const availableBind = weather(({ status }) => status === ServiceStatus.Available);

  const weatherIconBind = weather(weather => {
    if (weather.status === ServiceStatus.Unavailable) return '';

    if (weather.death) return ' ';

    const precipitationIconMap = {
      [Precipitation.Rain]: '',
      [Precipitation.Thunderstorm]: '󱐋',
      [Precipitation.Snow]: ' '
    };
    if (weather.precipitation !== Precipitation.None) return precipitationIconMap[weather.precipitation];

    if (weather.clouds > 25) return '󰖐 ';

    return ' ';
  });

  const temperatureState = Variable(WeatherTemperatureState.Real);

  const temperatureStateLabelMap = {
    [WeatherTemperatureState.Real]: <label>
      {weather(weather => {
        if (weather.status === ServiceStatus.Unavailable) return '';

        return `${weather.temperature.real.toFixed()}°C`;
      })}
    </label>,
    [WeatherTemperatureState.Feel]: <label>
      {weather(weather => {
        if (weather.status === ServiceStatus.Unavailable) return '';

        return `󰾞${weather.temperature.feel.toFixed()}°C`;
      })}
    </label>
  };

  const onClick = (_: any, event: Gdk.ButtonEvent): void => {
    if (event.get_button() !== Gdk.BUTTON_PRIMARY) return;

    if (temperatureState.get() === WeatherTemperatureState.Real) temperatureState.set(WeatherTemperatureState.Feel);
    else temperatureState.set(WeatherTemperatureState.Real);
  };


  return (
    <box
      onButtonReleased={onClick}
      visible={availableBind}
    >
      <label>{weatherIconBind}</label>
      {temperatureState(state => temperatureStateLabelMap[state])}
    </box>
  );
};
