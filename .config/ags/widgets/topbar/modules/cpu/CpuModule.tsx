import { cpuUtilization } from '@/services/system';

import Icon from '@/widgets/icon/Icon';

export default () => {
  const cpuLabelBind = cpuUtilization(cpuUtilization => `${cpuUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <Icon icon=''/>
      <label>{cpuLabelBind}</label>
    </box>
  );
};
