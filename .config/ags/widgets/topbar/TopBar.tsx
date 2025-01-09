import { App, Gdk, Astal } from 'astal/gtk4';
import RamInfo from './elements/RamInfo';
import CpuInfo from './elements/CpuInfo';
import BatteryInfo from './elements/BatteryInfo';
import WeatherInfo from './elements/WeatherInfo';

const { WindowAnchor, Exclusivity } = Astal;

export default (monitor: Gdk.Monitor) => {
  return (
    <window
      cssClasses={['topbar']}
      visible
      gdkmonitor={monitor}
      application={App}
      exclusivity={Exclusivity.EXCLUSIVE}
      anchor={WindowAnchor.TOP | WindowAnchor.LEFT | WindowAnchor.RIGHT}
    >
      <centerbox
        cssClasses={['topbar__container']}
        hexpand
      >
        <box spacing={10}>
          <BatteryInfo/>
          <CpuInfo/>
          <RamInfo/>
        </box>

        <box/>

        <box spacing={10}>
          <WeatherInfo/>
        </box>
      </centerbox>
    </window>
  );
};
