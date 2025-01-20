import { systemLayout } from '@/services/system';
import { execAsync } from 'astal';

import Icon from '@/widgets/icon/Icon';

export default () => {
  const labelBind = systemLayout(systemLayout => {
    const layoutAbbriviationMap: Record<string, string> = {
      'Russian': 'Ru',
      'English (US)': 'En'
    };

    return layoutAbbriviationMap[systemLayout] ?? '';
  });

  const onClick = () => {
    execAsync('hyprctl switchxkblayout main next');
  };

  return (
    <eventbox onClickRelease={onClick} cursor='pointer'>
      <box spacing={3}>
        <Icon icon='󰌌'/>
        <label>{labelBind}</label>
      </box>
    </eventbox>
  );
};
