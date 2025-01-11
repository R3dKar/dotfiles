import { readFileAsync, Variable } from 'astal';

let oldWorkTime = 0, oldIdleTime = 0;
const cpuUtilization = Variable(0);
cpuUtilization.poll(
  1000,
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

const ramUtilization = Variable(0);
ramUtilization.poll(
  1000,
  ['zsh', '-c', "free | grep Mem | awk '{print $3/$2*100.0}'"],
  (data: string) => parseFloat(data)
);

export interface SystemData {
  cpuUtilization: number,
  ramUtilization: number
};

export const system: Variable<SystemData> = Variable.derive(
  [cpuUtilization, ramUtilization],
  (cpuUtilization, ramUtilization) => ({ cpuUtilization, ramUtilization })
);
