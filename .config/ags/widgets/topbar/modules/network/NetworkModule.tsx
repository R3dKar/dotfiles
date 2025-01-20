import { convertWithPrefix } from '@/utility/misc';
import { network } from '@/services/network';
import { ServiceStatus } from '@/services/service';
import { bind, Variable } from 'astal';
import { Astal, Gdk, Gtk } from 'astal/gtk3';
import Tray from 'gi://AstalTray';

import Icon from '@/widgets/icon/Icon';

enum NetworkSpeedState {
  Download,
  Upload
};

const tray = Tray.get_default();
const appletTrayItem: Variable<Tray.TrayItem | undefined> = Variable.derive(
  [bind(tray, 'items')],
  (items) => items.find(item => item.id === 'nm-applet')
);

const availableBind = network(({ status }) => status === ServiceStatus.Available);

const DownloadSpeedInfo = () => {
  const speedBind = network(network => {
    if (network.status === ServiceStatus.Unavailable) return '';

    const [downloadSpeed, prefix] = convertWithPrefix(network.speed.download);
    return `${downloadSpeed.toFixed()} ${prefix}B/s`;
  });

  return (
    <box visible={availableBind} spacing={3}>
      <Icon icon=''/>
      <label>{speedBind}</label>
    </box>
  );
};

const UploadSpeedInfo = () => {
  const speedBind = network(network => {
    if (network.status === ServiceStatus.Unavailable) return '';

    const [uploadSpeed, prefix] = convertWithPrefix(network.speed.upload);
    return `${uploadSpeed.toFixed()} ${prefix}B/s`;
  });

  return (
    <box visible={availableBind} spacing={3}>
      <Icon icon=''/>
      <label>{speedBind}</label>
    </box>
  );
};

export default () => {
  const networkIconBind = network(({ status }) => {
    if (status === ServiceStatus.Unavailable) return '󱐅';
    return '󰇧';
  });

  const deviceBind = network(network => {
    if (network.status === ServiceStatus.Unavailable) return '';
    return network.device;
  });

  const speedState = Variable(NetworkSpeedState.Download);

  const onClick = (sender: Gtk.Widget, event: Astal.ClickEvent): void => {
    if (event.button === Astal.MouseButton.PRIMARY)
      speedState.set((speedState.get() + 1) % (Object.keys(NetworkSpeedState).length / 2));

    if (event.button === Astal.MouseButton.SECONDARY) {
      const applet = appletTrayItem.get();
      if (applet === undefined) return;

      const menu = Gtk.Menu.new_from_model(applet.menuModel);
      menu.insert_action_group('dbusmenu', applet.actionGroup);
      menu.popup_at_rect(sender.window, new Gdk.Rectangle({ height: 25 }), Gdk.Gravity.SOUTH_WEST, Gdk.Gravity.NORTH_WEST, null);
    }
  };

  return (
    <eventbox onClickRelease={onClick} cursor='pointer'>
      <box spacing={3}>
        <Icon icon={networkIconBind}/>
        <label visible={availableBind}>{deviceBind}</label>
        {speedState(state => {
          switch (state) {
            case NetworkSpeedState.Download:
              return <DownloadSpeedInfo/>;
            case NetworkSpeedState.Upload:
              return <UploadSpeedInfo/>;
          }
        })}
      </box>
    </eventbox>
  );
};
