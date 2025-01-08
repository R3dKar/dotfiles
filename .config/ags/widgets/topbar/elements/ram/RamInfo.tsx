import { Variable } from 'astal';

export const ramUsage = Variable(0).poll(
  1000, ['zsh', '-c', "free | grep Mem | awk '{print $3/$2*100}'"],
  (data: string) => parseFloat(data)
);

export default () => {
  return (
    <label>
      {ramUsage(data => ` ${Math.round(data)}%`)}
    </label>
  );
};
