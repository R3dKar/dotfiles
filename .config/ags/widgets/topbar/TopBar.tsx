import { App, Gdk, Gtk, Astal } from 'astal/gtk4';
import RamInfo from './elements/ram/RamInfo';
import CpuInfo from './elements/cpu/CpuInfo';
import BatteryInfo from './elements/battery/BatteryInfo';

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

        </box>
      </centerbox>
    </window>
  );
};
