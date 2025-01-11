import { convertWithPrefix } from "@/utility/misc";
import { network } from "@/utility/network";
import { ServiceStatus } from "@/utility/service";
import { Variable } from "astal";

enum NetworkSpeedState {
  Download,
  Upload
};

const availableBind = network(({ status }) => status === ServiceStatus.Available);

const DownloadSpeedInfo = () => {
  return (
    <box visible={availableBind} spacing={3}>
      <label></label>
      <label>
        {network(network => {
          if (network.status === ServiceStatus.Unavailable) return '';

          const [downloadSpeed, prefix] = convertWithPrefix(network.speed.download);
          return `${downloadSpeed.toFixed()} ${prefix}B/s`;
        })}
      </label>
    </box>
  );
};

const UploadSpeedInfo = () => {
  return (
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
  );
};

export default () => {
  const networkIconBind = network(({ status }) => {
    if (status === ServiceStatus.Unavailable) return '󱐅 ';
    return '󰇧 ';
  });

  const deviceBind = network(network => {
    if (network.status === ServiceStatus.Unavailable) return '';
    return network.device;
  });

  const speedState = Variable(NetworkSpeedState.Download);

  const onClick = () => {
    speedState.set((speedState.get() + 1) % (Object.keys(NetworkSpeedState).length / 2));
  };

  return (
    <eventbox onClickRelease={onClick}>
      <box spacing={3}>
        <label>{networkIconBind}</label>
        <label visible={availableBind}>{deviceBind}</label>
        {speedState(state => {
          switch (state) {
            case NetworkSpeedState.Download:
              return <DownloadSpeedInfo/>;
            case NetworkSpeedState.Upload:
              return <UploadSpeedInfo/>;
          }
        })}
      </box>
    </eventbox>
  );
};
