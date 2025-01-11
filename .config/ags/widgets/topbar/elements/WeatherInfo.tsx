import { ServiceStatus } from '@/utility/service';
import { weather } from '@/utility/weather';

export default () => {
  const weatherLabelBind = weather(weather => {
    if (weather.status === ServiceStatus.Unavailable) return '???';

    return `${weather.temperature.feel.toFixed()}°C`;
  });

  return (
    <box spacing={3}>
      <label>󰖐 </label>
      <label>{weatherLabelBind}</label>
    </box>
  );
};
