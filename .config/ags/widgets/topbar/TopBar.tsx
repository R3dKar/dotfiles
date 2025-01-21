import { App, Gdk, Astal, Gtk } from 'astal/gtk3';

import RamModule from './modules/ram/RamModule';
import CpuModule from './modules/cpu/CpuModule';
import BatteryModule from './modules/battery/BatteryModule';
import WeatherModule from './modules/weather/WeatherModule';
import TimeModule from './modules/time/TimeModule';
import NetworkModule from './modules/network/NetworkModule';
import TrayModule from './modules/tray/TrayModule';
import WorkspaceModule from './modules/workspaces/WorkspacesModule';
import LayoutModule from './modules/layout/LayoutModule';
import AudioModule from './modules/audio/AudioModule';

const { WindowAnchor, Exclusivity } = Astal;

export default (monitor: Gdk.Monitor) => {
  return (
    <window
      className='topbar'
      visible
      gdkmonitor={monitor}
      application={App}
      exclusivity={Exclusivity.EXCLUSIVE}
      namespace='topbar'
      anchor={WindowAnchor.TOP | WindowAnchor.LEFT | WindowAnchor.RIGHT}
    >
      <centerbox className='topbar__container' hexpand>
        <box halign={Gtk.Align.START} spacing={10}>
          <BatteryModule/>
          <CpuModule/>
          <RamModule/>
          <NetworkModule/>
        </box>

        <box halign={Gtk.Align.CENTER} spacing={10}>
          <WorkspaceModule monitor={monitor}/>
        </box>

        <box halign={Gtk.Align.END} spacing={10}>
          <TrayModule/>
          <WeatherModule/>
          <AudioModule/>
          <LayoutModule/>
          <TimeModule/>
        </box>
      </centerbox>
    </window>
  );
};
