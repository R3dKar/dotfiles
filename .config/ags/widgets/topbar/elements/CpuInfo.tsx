import { system } from '@/utility/system';

export default () => {
  const cpuLabelBind = system(({ cpuUtilization }) => `${cpuUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <label> </label>
      <label>{cpuLabelBind}</label>
    </box>
  );
};
