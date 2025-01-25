import { Variable } from 'astal';
import { App, Astal, Gdk } from 'astal/gtk3';
import { Entry } from 'astal/gtk3/widget';
import { search } from './modules/search';

import LauncherOption from './modules/LauncherOption';

export default () => {
  const text = Variable('');
  const options = text(text => search(text));
  const selectionIndex = Variable(0);

  const dismiss = () => App.get_window('launcher')?.hide();

  const onKeyPress = (_: unknown, event: Gdk.Event) => {
    const key = event.get_keyval()[1];

    switch (key) {
      case Gdk.KEY_Escape:
        return dismiss();
      case Gdk.KEY_Down:
        return selectionIndex.set(Math.min(selectionIndex.get()+1, options.get().length - 1));
      case Gdk.KEY_Up:
        return selectionIndex.set(Math.max(selectionIndex.get()-1, 0));
    }
  };

  const onEnter = (entry: Entry) => {
    dismiss();
    options.get()[selectionIndex.get()]?.launch();
    entry.select_region(0, -1);
  };

  const onType = (entry: Entry) => {
    text.set(entry.text);
    selectionIndex.set(0);
  }

  return (
    <window
      name='launcher'
      application={App}
      className='launcher'
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.OVERLAY}
      namespace='launcher'
      keymode={Astal.Keymode.EXCLUSIVE}
      onKeyPressEvent={onKeyPress}
      visible={false}
    >
      <box>
        <eventbox hexpand onClick={dismiss}/>
        <box vertical>
          <eventbox heightRequest={450} onClick={dismiss}/>
          <box className='launcher__box' widthRequest={500} spacing={5} vertical>
            <entry className='launcher__input' onChanged={onType} onActivate={onEnter}/>

            <box className='launcher__results' spacing={5} vertical>
              {options.as((options) => options.map((option, index) => {
                return <LauncherOption {...option.props} selected={selectionIndex(current => current === index)}/>;
              }))}
            </box>
          </box>
          <eventbox vexpand onClick={dismiss}/>
        </box>
        <eventbox hexpand onClick={dismiss}/>
      </box>
    </window>
  );
};
