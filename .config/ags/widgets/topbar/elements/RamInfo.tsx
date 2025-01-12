import { system } from '@/utility/system';

import Icon from '@/widgets/icon/Icon';

export default () => {
  const ramLabelBind = system(({ ramUtilization }) => `${ramUtilization.toFixed()}%`);

  return (
    <box spacing={3}>
      <Icon icon=''/>
      <label>{ramLabelBind}</label>
    </box>
  );
};
