import Tray from 'gi://AstalTray';
import { bind } from 'astal';
import { Astal, Gdk, Gtk } from 'astal/gtk3';

const tray = Tray.get_default();

interface TrayItemProps {
  item: Tray.TrayItem
}

const TrayItem = ({ item }: TrayItemProps) => {
  const onClick = (sender: Gtk.Widget, event: Astal.ClickEvent): void => {
    if (event.button === Astal.MouseButton.PRIMARY)
      item.activate(0, 0);

    if (event.button === Astal.MouseButton.SECONDARY) {
      const menu = Gtk.Menu.new_from_model(item.menuModel);
      menu.insert_action_group('dbusmenu', item.actionGroup);
      menu.popup_at_rect(sender.window, new Gdk.Rectangle({ height: 25 }), Gdk.Gravity.SOUTH_WEST, Gdk.Gravity.NORTH_WEST, null);
    }
  };

  return (
    <eventbox
      onClickRelease={onClick}
      tooltipMarkup={bind(item, 'tooltipMarkup')}
    >
      <icon gicon={bind(item, 'gicon')}/>
    </eventbox>
  );
};

export default () => {
  return (
    <box spacing={10}>
      {bind(tray, 'items').as(items =>
        items.filter(item => item.status !== Tray.Status.PASSIVE && item.id !== 'nm-applet')
        .map(item => <TrayItem item={item}/>)
      )}
    </box>
  );
};
