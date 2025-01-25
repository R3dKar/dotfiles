import { Variable, bind } from 'astal';
import { Astal } from 'astal/gtk3';
import Wp from 'gi://AstalWp';

import Icon from '@/widgets/icon/Icon';

const wirePlumber = Wp.get_default()!;

enum AudioInfoState {
  Speaker,
  Microphone
};

interface EndpointInfoProps {
  endpoint: Wp.Endpoint;
  type?: 'microphone' | 'speaker';
};

const EndpointInfo = ({ endpoint, type }: EndpointInfoProps) => {
  type = type ?? (endpoint.mediaClass === Wp.MediaClass.AUDIO_MICROPHONE ? 'microphone' : 'speaker');

  const iconBind = bind(endpoint, 'mute').as((mute): string => {
    if (mute && type === 'microphone') return '󰍭';
    if (!mute && type === 'microphone' ) return '󰍬';

    if (mute && type === 'speaker') return '';
    if (!mute && type === 'speaker') return '';

    return '';
  });

  const labelBind = bind(endpoint, 'volume').as(volume => `${(volume*100).toFixed()}%`);

  const onClick = (_: unknown, event: Astal.ClickEvent) => {
    if (event.button === Astal.MouseButton.PRIMARY)
      endpoint.mute = !endpoint.mute;
  };

  const onScroll = (_: unknown, event: Astal.ScrollEvent) => {
    const CHANGE_SPEED = 0.03;

    const newVolume = Math.max(0, endpoint.volume - CHANGE_SPEED*event.delta_y);
    endpoint.volume = newVolume;
  };

  return (
    <eventbox onClick={onClick} onScroll={onScroll} cursor='pointer'>
      <box spacing={3}>
        <Icon icon={iconBind}/>
        <label>{labelBind}</label>
      </box>
    </eventbox>
  );
};

export default () => {
  const audioInfoState = Variable(AudioInfoState.Speaker);

  const onClick = (_: unknown, event: Astal.ClickEvent) => {
    if (event.button !== Astal.MouseButton.SECONDARY) return;
    audioInfoState.set((audioInfoState.get() + 1) % (Object.keys(AudioInfoState).length / 2));
  };

  return (
    <eventbox onClickRelease={onClick} cursor='pointer'>
      {audioInfoState(state => {
        switch (state) {
          case AudioInfoState.Speaker:
            return <EndpointInfo endpoint={wirePlumber.defaultSpeaker} type='speaker'/>;
          case AudioInfoState.Microphone:
            return <EndpointInfo endpoint={wirePlumber.defaultMicrophone} type='microphone'/>;
        }
      })}
    </eventbox>
  );
};
