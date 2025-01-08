import { App } from 'astal/gtk4';
import style from './style.scss';
import TopBar from './widgets/topbar/TopBar';

App.start({
  instanceName: 'topbar',
  css: style,
  main: () => void App.get_monitors().map(TopBar)
});
