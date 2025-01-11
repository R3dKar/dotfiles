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

const INTERFACE = 'wlo1';

let oldDownloadBytes = 0, oldUploadBytes = 0;
const downloadSpeed = Variable(0);
const uploadSpeed = Variable(0);

interval(
  1000,
  async () => {
    const data = await readFileAsync('/proc/net/dev');
    const interfaceData = data.split('\n').find(line => line.trim().startsWith(INTERFACE))!;
    const [, downloadBytes,,,,,,,, uploadBytes] = interfaceData.trim().split(/\s+/).map(item => parseInt(item)); // bruh

    if (oldDownloadBytes > 0) downloadSpeed.set(downloadBytes - oldDownloadBytes);
    if (oldUploadBytes > 0) uploadSpeed.set(uploadBytes - oldUploadBytes);

    oldDownloadBytes = downloadBytes;
    oldUploadBytes = uploadBytes;
  }
);

export interface Network {
  interface: string,
  speed: {
    download: number,
    upload: number
  }
};

export type NetworkData = ServiceData<Network>;

// export const network = Variable<NetworkData>({ status: ServiceStatus.Unavailable });
export const network: Variable<NetworkData> = Variable.derive(
  [downloadSpeed, uploadSpeed],
  (downloadSpeed, uploadSpeed) => ({
    status: ServiceStatus.Available,
    interface: INTERFACE,
    speed: {
      download: downloadSpeed,
      upload: uploadSpeed
    }
  })
);
