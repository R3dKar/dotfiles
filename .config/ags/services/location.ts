import { interval, Variable } from 'astal';
import { device } from './network';
import { ServiceData, ServiceStatus } from './service';
import { fetchJsonAsync } from '@/utility/network';

const POLLING_INTERVAL = 10*60*1000;


export interface Location {
  city: string;
  latitude: number;
  longitude: number;
}

export type LocationData = ServiceData<Location>;

export const location = Variable<LocationData>({ status: ServiceStatus.Unavailable });

const updateLocation = async () => {
  try {
    const data = await fetchJsonAsync('http://ip-api.com/json/?lang=ru&fields=status,message,city,lat,lon', 10*1000, 10);

    location.set({
      status: ServiceStatus.Available,
      city: data.city,
      latitude: data.lat,
      longitude: data.lon
    });
  } catch {}
};

interval(POLLING_INTERVAL, updateLocation);
device.subscribe(
  async device => {
    if (device === undefined) return;
    await updateLocation();
  }
);
