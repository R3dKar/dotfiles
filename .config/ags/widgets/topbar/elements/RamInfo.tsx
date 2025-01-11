import { system } from '@/utility/system';

export default () => {
  const ramLabelBind = system(({ ramUtilization }) => `${ramUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <label> </label>
      <label>{ramLabelBind}</label>
    </box>
  );
};
