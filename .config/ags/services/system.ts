import { execAsync, readFileAsync, Variable } from 'astal';
import Hyprland from 'gi://AstalHyprland';

const POLLING_INTERVAL = 1000;

let oldWorkTime = 0, oldIdleTime = 0;
export const cpuUtilization = Variable(0);
cpuUtilization.poll(
  POLLING_INTERVAL,
  async () => {
    const data = await readFileAsync('/proc/stat');
    const cpuData = data.split('\n').find(line => line.trim().startsWith('cpu '))!;
    const [, userTime, , systemTime, idleTime] = cpuData.trim().split(/\s+/).map(item => parseInt(item));

    let cpuUtilization = ((userTime + systemTime) - oldWorkTime) / ((userTime + systemTime + idleTime) - (oldWorkTime + oldIdleTime));

    if (oldWorkTime === 0 || oldIdleTime === 0) cpuUtilization = 0;

    oldWorkTime = userTime + systemTime;
    oldIdleTime = idleTime;

    return cpuUtilization * 100;
  }
);

export const ramUtilization = Variable(0);
ramUtilization.poll(
  POLLING_INTERVAL,
  ['zsh', '-c', "free | grep Mem | awk '{print $3/$2*100.0}'"],
  (data: string) => parseFloat(data)
);

export const systemLayout = Variable('');
Hyprland.get_default().connect('keyboard-layout', (_, __, layout) => systemLayout.set(layout));
execAsync(['zsh', '-c', 'hyprctl devices -j | jq ".keyboards[] | select(.main) | .active_keymap"'])
  .then(layout => systemLayout.set(layout.replaceAll('"', '')));


export interface SystemData {
  cpuUtilization: number,
  ramUtilization: number,
  systemLayout: string
};

export const system: Variable<SystemData> = Variable.derive(
  [cpuUtilization, ramUtilization, systemLayout],
  (cpuUtilization, ramUtilization, systemLayout) => ({ cpuUtilization, ramUtilization, systemLayout })
);
