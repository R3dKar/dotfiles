import { Variable } from 'astal';

const DATE_FORMAT = '%T %a %d.%m.%Y';
const POLLING_INTERVAL = 200;

export const time = Variable('');
time.poll(POLLING_INTERVAL, `date +"${DATE_FORMAT}"`);
