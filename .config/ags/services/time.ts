import { Variable } from 'astal';
import GLib from 'gi://GLib';

const DATE_FORMAT = '%T %a %d.%m.%Y';
const POLLING_INTERVAL = 200;

export const time = Variable('');
time.poll(POLLING_INTERVAL, () => GLib.DateTime.new_now_local().format(DATE_FORMAT)!);
