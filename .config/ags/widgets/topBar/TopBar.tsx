import { App, Gdk, Gtk, Astal } from "astal/gtk4";

const { Orientation } = Gtk;
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
        <box orientation={Orientation.HORIZONTAL} spacing={3}>

        </box>

        <box/>

        <box orientation={Orientation.HORIZONTAL} spacing={3}>

        </box>
      </centerbox>
    </window>
  );
};
