import { App, Gdk, Astal, Gtk } from 'astal/gtk3';

import RamInfo from './modules/ram/RamModule';
import CpuInfo from './modules/cpu/CpuModule';
import BatteryInfo from './modules/battery/BatteryModule';
import WeatherInfo from './modules/weather/WeatherModule';
import TimeInfo from './modules/time/TimeModule';
import NetworkInfo from './modules/network/NetworkModule';
import Tray from './modules/tray/TrayModule';
import WorkspaceInfo from './modules/workspaces/WorkspacesModule';
import LayoutInfo from './modules/layout/LayoutModule';

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
      <centerbox className='topbar__container' hexpand>
        <box halign={Gtk.Align.START} spacing={10}>
          <BatteryInfo/>
          <CpuInfo/>
          <RamInfo/>
          <NetworkInfo/>
        </box>

        <box halign={Gtk.Align.CENTER} spacing={10}>
          <WorkspaceInfo monitor={monitor}/>
        </box>

        <box halign={Gtk.Align.END} spacing={10}>
          <Tray/>
          <WeatherInfo/>
          <LayoutInfo/>
          <TimeInfo/>
        </box>
      </centerbox>
    </window>
  );
};
