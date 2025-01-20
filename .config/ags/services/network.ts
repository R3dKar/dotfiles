import { execAsync, interval, readFileAsync, Variable } from 'astal';
import { ServiceData, ServiceStatus } from './service';

const POLLING_INTERVAL = 1000;

export const device = Variable<string | undefined>(undefined);
interval(
  POLLING_INTERVAL,
  async () => {
    try {
      const data = await execAsync('ip route get 8.8.8.8');
      const match = data.match(/dev\s+(\w+)/);

      if (match === null) device.set(undefined);
      else device.set(match[1]);
    } catch {
      device.set(undefined);
    }
  }
);

let oldDownloadBytes = 0, oldUploadBytes = 0;
export const downloadSpeed = Variable(0);
export const uploadSpeed = Variable(0);

interval(
  POLLING_INTERVAL,
  async () => {
    const currentDevice = device.get();

    if (currentDevice === undefined) return;

    const data = await readFileAsync('/proc/net/dev');
    const deviceData = data.split('\n').find(line => line.trim().startsWith(currentDevice));

    if (deviceData === undefined) {
      downloadSpeed.set(0);
      uploadSpeed.set(0);
      return;
    }

    const parsedData = deviceData.trim().split(/\s+/).map(item => parseInt(item));
    const downloadBytes = parsedData[1];
    const uploadBytes = parsedData[9];

    if (oldDownloadBytes > 0) downloadSpeed.set((downloadBytes - oldDownloadBytes) / POLLING_INTERVAL * 1000);
    if (oldUploadBytes > 0) uploadSpeed.set((uploadBytes - oldUploadBytes) / POLLING_INTERVAL * 1000);

    oldDownloadBytes = downloadBytes;
    oldUploadBytes = uploadBytes;
  }
);
device.subscribe(() => {
  oldDownloadBytes = 0;
  oldUploadBytes = 0;

  downloadSpeed.set(0);
  uploadSpeed.set(0);
});


export interface Network {
  device: string,
  speed: {
    download: number,
    upload: number
  }
};

export type NetworkData = ServiceData<Network>;

export const network: Variable<NetworkData> = Variable.derive(
  [device, downloadSpeed, uploadSpeed],
  (device, downloadSpeed, uploadSpeed) => {
    if (device === undefined) return { status: ServiceStatus.Unavailable };

    return {
      status: ServiceStatus.Available,
      device,
      speed: {
        download: downloadSpeed,
        upload: uploadSpeed
      }
    };
  }
);
