import { App, Gtk } from 'astal/gtk3';
import style from './style.scss';
import TopBar from './widgets/topbar/TopBar';
import Launcher from './widgets/launcher/Launcher';

let launcher: Gtk.Widget | undefined;

App.start({
  instanceName: 'astal',
  css: style,
  main: () => {
    App.get_monitors().filter(monitor => monitor.model.trim() === 'AQ27H1').map(TopBar);
    launcher = Launcher();
  },
  requestHandler: (request, res) => {
    if (request === 'launcher' && launcher !== undefined)
      launcher.visible = !launcher.visible;

    return res('');
  },
});
