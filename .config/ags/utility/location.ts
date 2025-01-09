import { Variable } from 'astal';
import { fetchJsonAsync } from './network';
import { ServiceData, ServiceStatus } from './service';

export interface Location {
  city: string,
  latitude: number,
  longitude: number
}

export type LocationData = ServiceData<Location>;

export const location = Variable<LocationData>({ status: ServiceStatus.Unavailable });

location.poll(10*60*1000, async (previousData) => {
  try {
    const data = await fetchJsonAsync('http://ip-api.com/json/?lang=ru&fields=status,message,city,lat,lon', 10*1000, 10);

    return {
      status: ServiceStatus.Available,
      city: data.city,
      latitude: data.lat,
      longitude: data.lon
    };
  } catch {
    return previousData;
  }
});
