import { network } from "@/utility/network";
import { ServiceStatus } from "@/utility/service";
import { bind } from "astal";

export default () => {
  return (
    <>
    <label>{network((network) => {
      if (network.status === ServiceStatus.Unavailable) return '';

      return `up: ${Math.round(network.speed.upload / 1024)} kB/s | down: ${Math.round(network.speed.download / 1024)} kB/s`;
    })}</label>
    </>
  );
};
