import { Binding } from 'astal';
import { bindify } from '@/utility/misc';

export interface IconProps {
  icon: string | Binding<string>,
  size?: number | Binding<number>
};

export default ({ icon, size }: IconProps) => {
  return (
    <label
      css={size !== undefined ? bindify(size).as(size => `font-size: ${size}px`) : ''}
      className='icon'
      label={bindify(icon).as(icon => icon.trimEnd())}
    />
  );
};
