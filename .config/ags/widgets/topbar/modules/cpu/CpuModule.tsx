import { system } from '@/services/system';

import Icon from '@/widgets/icon/Icon';

export default () => {
  const cpuLabelBind = system(({ cpuUtilization }) => `${cpuUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <Icon icon=''/>
      <label>{cpuLabelBind}</label>
    </box>
  );
};
