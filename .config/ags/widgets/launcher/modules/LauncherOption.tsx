import { classList } from '@/utility/binding';
import { Binding } from 'astal';
import { Gtk } from 'astal/gtk3';

import Icon from '@/widgets/icon/Icon';

export interface LauncherOptionProps {
  icon: string;
  name: string;
  description?: string;
  selected: boolean | Binding<boolean>;
};

export default ({ icon, name, description, selected }: LauncherOptionProps) => {
  const classes = classList({
    'launcher-option_selected': selected,
    'launcher-option': true
  });

  const iconElement = (icon.match(/./gu) ?? []).length === 1
  ? <Icon className='launcher-option__icon-symbolic' icon={icon}/>
  : <icon className='launcher-option__icon' icon={icon}/>;

  return (
    <box className={classes()} onDestroy={() => classes.drop()} spacing={10}>
      {iconElement}
      <box vertical>
        <label
          className='launcher-option__name'
          halign={Gtk.Align.START}
          maxWidthChars={30}
          truncate
        >
          {name}
        </label>
        <label
          className='launcher-option__description'
          visible={typeof description === 'string' && description.length > 0}
          halign={Gtk.Align.START}
          maxWidthChars={50}
          truncate
        >
          {description || ''}
        </label>
      </box>
    </box>
  );
};
