import { execAsync, interval, readFileAsync, Variable } from 'astal';
import { sleepAsync } from './time';
import { ServiceData, ServiceStatus } from './service';

export const fetchJsonAsync = async (url: string, retryTimeout: number = 10*1000, retryCount: number = -1): Promise<any> => {
  let response = '';
  let retries = 0;

  while (!response) {
    try {
      response = await execAsync(`curl "${url}"`);
    } catch {
      if (retryCount === retries) throw new Error(`Cannot reach ${url} in ${retryCount} tries`);

      retries++;
      await sleepAsync(retryTimeout);
    }
  }

  return JSON.parse(response);
};

const device = Variable<string | undefined>(undefined);
interval(
  1000,
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
const downloadSpeed = Variable(0);
const uploadSpeed = Variable(0);

interval(
  1000,
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

    const [, downloadBytes,,,,,,,, uploadBytes] = deviceData.trim().split(/\s+/).map(item => parseInt(item)); // bruh

    if (oldDownloadBytes > 0) downloadSpeed.set(downloadBytes - oldDownloadBytes);
    if (oldUploadBytes > 0) uploadSpeed.set(uploadBytes - oldUploadBytes);

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
