import { Variable } from 'astal';

const cpuUtilization = Variable(0);
cpuUtilization.poll(
  1000,
  ['zsh', '-c', "awk '{u=$2+$4; t=$2+$4+$5; if (NR==1){u1=u; t1=t;} else print ($2+$4-u1) * 100 / (t-t1) }' <(grep 'cpu ' /proc/stat) <(sleep 1;grep 'cpu ' /proc/stat)"],
  (data: string) => parseFloat(data)
);

const ramUtilization = Variable(0);
ramUtilization.poll(
  1000,
  ['zsh', '-c', "free | grep Mem | awk '{print $3/$2*100}'"],
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
