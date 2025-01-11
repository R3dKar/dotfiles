import { App, Gdk, Astal, Gtk } from 'astal/gtk3';
import RamInfo from './elements/RamInfo';
import CpuInfo from './elements/CpuInfo';
import BatteryInfo from './elements/BatteryInfo';
import WeatherInfo from './elements/WeatherInfo';
import TimeInfo from './elements/TimeInfo';
import NetworkInfo from './elements/NetworkInfo';

const { WindowAnchor, Exclusivity } = Astal;

export default (monitor: Gdk.Monitor) => {
  return (
    <window
      className='topbar'
      visible
      gdkmonitor={monitor}
      application={App}
      exclusivity={Exclusivity.EXCLUSIVE}
      anchor={WindowAnchor.TOP | WindowAnchor.LEFT | WindowAnchor.RIGHT}
    >
      <centerbox
        className='topbar__container'
        hexpand
      >
        <box halign={Gtk.Align.START} spacing={10}>
          <BatteryInfo/>
          <CpuInfo/>
          <RamInfo/>
          <NetworkInfo/>
        </box>

        <box/>

        <box halign={Gtk.Align.END} spacing={10}>
          <WeatherInfo/>
          <TimeInfo/>
        </box>
      </centerbox>
    </window>
  );
};
