import { ramUtilization } from '@/services/system';

import Icon from '@/widgets/icon/Icon';

export default () => {
  const ramLabelBind = ramUtilization(ramUtilization => `${ramUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <Icon icon=''/>
      <label>{ramLabelBind}</label>
    </box>
  );
};
