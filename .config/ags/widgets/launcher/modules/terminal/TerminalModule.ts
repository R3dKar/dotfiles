import { Option } from '@/widgets/launcher/modules/option';
import { execAsync } from 'astal';

export class TerminalOption implements Option {
  constructor(private cmd: string) {}

  launch() {
    execAsync(`alacritty --hold -e ${this.cmd}`)
    .catch(() => console.log(`[LancherTerminalModule] "${this.cmd}" failed`));
  }

  get props() {
    return {
      icon: '',
      name: this.cmd,
      description: `Launch "${this.cmd}" in terminal`
    };
  }
}

export default (query: string) : Option[] => {
  if (query.length === 0) return [];

  return [new TerminalOption(query)];
};
