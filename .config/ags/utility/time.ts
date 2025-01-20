import { timeout } from "astal";

export const sleepAsync = (time: number) => new Promise<void>(resolve => void timeout(time, resolve));
