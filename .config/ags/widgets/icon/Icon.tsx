import { Binding } from 'astal';
import style from './style.scss';

export interface IconProps {
  icon: string | Binding<string>
};

export default ({ icon }: IconProps) => {
  let trimmedIcon = icon instanceof Binding ?
    icon.as(icon => icon.trimEnd()) :
    icon.trimEnd()
  ;

  return (
    <label
      css={style}
      className='icon'
      label={trimmedIcon}
    />
  );
};
