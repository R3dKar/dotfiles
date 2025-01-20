import { time } from '@/services/time';

export default () => {
  return (
    <label>{time()}</label>
  );
};
