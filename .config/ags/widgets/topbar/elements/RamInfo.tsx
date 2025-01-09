import { system } from '@/utility/system';

export default () => {
  const ramLabelBind = system(({ ramUtilization }) => `${Math.round(ramUtilization)}%`);

  return (
    <box spacing={3}>
      <label> </label>
      <label>{ramLabelBind}</label>
    </box>
  );
};
