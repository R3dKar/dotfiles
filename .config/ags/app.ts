import { App } from "astal/gtk4";
import style from './style.scss';
import TopBar from "./widgets/topBar/TopBar";

App.start({
  css: style,
  main: () => void App.get_monitors().map(TopBar)
});
