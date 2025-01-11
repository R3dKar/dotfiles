import { interval, Variable } from 'astal';
import { ServiceData, ServiceStatus } from './service';
import { location } from './location';
import { fetchJsonAsync } from './network';
import { env } from './environment';

export enum Precipitation {
  None,
  Rain,
  Thunderstorm,
  Snow,
}

export interface Weather {
  temperature: {
    real: number,
    feel: number
  },
  precipitation: Precipitation,
  clouds: number,
  death: boolean
};

export type WeatherData = ServiceData<Weather>;

export const weather = Variable<WeatherData>({ status: ServiceStatus.Unavailable });

const updateWeather = async () => {
  const previousLocation = location.get();

  if (previousLocation.status === ServiceStatus.Unavailable) return;

  let { latitude, longitude } = previousLocation;

  try {
    const data = await fetchJsonAsync(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${env.WEATHER_API_KEY}`, 10*1000, 10);

    console.log(data);

    const temperature = {
      real: data.main.temp as number,
      feel: data.main.feels_like as number
    };

    const statuses: string[] = data.weather.map((item: any) => item.id.toFixed());

    let precipitation = Precipitation.None;

    if (statuses.some(status => status.startsWith('2')))
      precipitation = Precipitation.Thunderstorm;
    else if (statuses.some(status => status.startsWith('6')))
      precipitation = Precipitation.Snow;
    else if (statuses.some(status => status.startsWith('3') || status.startsWith('5')))
      precipitation = Precipitation.Rain;

    let death =
      temperature.feel < -25 || temperature.feel > 28 ||
      statuses.some(status => status in ['781', '762', '622', '602', '522', '504', '503', '502', '314', '312', '302', '232', '212', '202'])
    ;

    weather.set({
      status: ServiceStatus.Available,
      temperature,
      precipitation,
      clouds: data.clouds.all,
      death
    });
  } catch {}
};

interval(10*60*1000, updateWeather);
location.subscribe(updateWeather);
