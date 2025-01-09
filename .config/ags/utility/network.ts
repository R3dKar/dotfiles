import { execAsync } from 'astal';
import { sleepAsync } from './time';

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
