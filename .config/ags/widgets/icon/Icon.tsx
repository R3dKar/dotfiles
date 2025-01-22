import { bindify } from '@/utility/binding';
import { Binding } from 'astal';

export interface IconProps {
  icon: string | Binding<string>;
  size?: number | Binding<number>;

  className?: string;
};

export default ({ icon, size, className }: IconProps) => {
  return (
    <label
      css={size !== undefined ? bindify(size).as(size => `font-size: ${size}px`) : ''}
      label={bindify(icon).as(icon => icon.trimEnd())}
      className={`icon ${className ?? ''}`}
    />
  );
};
