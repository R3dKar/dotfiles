import { Variable } from 'astal';
import { ServiceData, ServiceStatus } from './service';
import { location } from './location';
import { fetchJsonAsync } from './network';

export interface Weather {
  temperature: {
    now: number,
    min: number,
    max: number,
    feel: number
  }
};

export type WeatherData = ServiceData<Weather>;

export const weather = Variable<WeatherData>({ status: ServiceStatus.Unavailable });

const API_KEY = '';

const updateWeather = async (): Promise<WeatherData> => {
  const previousLocation = location.get();
  const previousWeather = weather.get();

  if (previousLocation.status === ServiceStatus.Unavailable) return previousWeather;

  const { latitude, longitude } = previousLocation;

  try {
    const data = await fetchJsonAsync(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${API_KEY}`, 10*1000, 10);
    return {
      status: ServiceStatus.Available,
      temperature: {
        now: data.main.temp,
        min: data.main.temp_min,
        max: data.main.temp_max,
        feel: data.main.feels_like
      }
    };
  } catch {
    return previousWeather;
  }
};

weather.poll(10*60*1000, updateWeather);
location.subscribe(async () => weather.set(await updateWeather()));
