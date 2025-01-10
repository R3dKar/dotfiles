import { timeout, Variable } from 'astal';

export const sleepAsync = (time: number) => new Promise<void>(resolve => void timeout(time, resolve));

const DATE_FORMAT = '%T %a %d.%m.%Y';

export const time = Variable('');
time.poll(200, `date +"${DATE_FORMAT}"`);
