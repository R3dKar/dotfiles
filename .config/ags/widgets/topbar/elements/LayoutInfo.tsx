import { system } from '@/utility/system';
import Icon from '@/widgets/icon/Icon';

export default () => {
  const labelBind = system(({ systemLayout }) => {
    const layoutAbbriviationMap: Record<string, string> = {
      'Russian': 'Ru',
      'English (US)': 'En'
    };

    return layoutAbbriviationMap[systemLayout] ?? '';
  });

  return (
    <box spacing={3}>
      <Icon icon='󰌌'/>
      <label>{labelBind}</label>
    </box>
  );
};
