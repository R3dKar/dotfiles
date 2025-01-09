import { system } from '@/utility/system';

export default () => {
  const cpuLabelBind = system(({ cpuUtilization }) => `${Math.round(cpuUtilization)}%`);

  return (
    <box spacing={3}>
      <label> </label>
      <label>{cpuLabelBind}</label>
    </box>
  );
};
