import { convertWithPrefix } from "@/utility/misc";
import { network } from "@/utility/network";
import { ServiceStatus } from "@/utility/service";
import { Variable } from "astal";
import { Gdk } from "astal/gtk4";

enum NetworkSpeedState {
  Download,
  Upload
};

export default () => {
  const networkIconBind = network(({ status }) => {
    if (status === ServiceStatus.Unavailable) return '󱐅 ';
    return '󰇧 ';
  });

  const availableBind = network(({ status }) => status === ServiceStatus.Available);

  const deviceBind = network(network => {
    if (network.status === ServiceStatus.Unavailable) return '';
    return network.device;
  });

  const speedState = Variable(NetworkSpeedState.Download);

  const speedStateLabelMap = {
    [NetworkSpeedState.Download]:
    <box visible={availableBind} spacing={3}>
      <label></label>
      <label>
        {network(network => {
          if (network.status === ServiceStatus.Unavailable) return '';
          const [downloadSpeed, prefix] = convertWithPrefix(network.speed.download);
          return `${downloadSpeed.toFixed()} ${prefix}B/s`;
        })}
      </label>
    </box>,
    [NetworkSpeedState.Upload]:
    <box visible={availableBind} spacing={3}>
      <label></label>
      <label>
        {network(network => {
          if (network.status === ServiceStatus.Unavailable) return '';
          const [uploadSpeed, prefix] = convertWithPrefix(network.speed.upload);
          return `${uploadSpeed.toFixed()} ${prefix}B/s`;
        })}
      </label>
    </box>
  };

  const onClick = (_: any, event: Gdk.ButtonEvent): void => {
    if (event.get_button() !== Gdk.BUTTON_PRIMARY) return;

    if (speedState.get() === NetworkSpeedState.Download) speedState.set(NetworkSpeedState.Upload);
    else speedState.set(NetworkSpeedState.Download);
  };

  return (
    <box
      onButtonReleased={onClick}
      spacing={3}
    >
      <label>{networkIconBind}</label>
      <label visible={availableBind}>{deviceBind}</label>
      {speedState(state => speedStateLabelMap[state])}
    </box>
  );
};
