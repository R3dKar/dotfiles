import { Option } from '@/widgets/launcher/modules/option';
import { exec, execAsync } from 'astal';

export class TerminalOption implements Option {
  private result: string;

  constructor(equation: string) {
    this.result = exec(`timeout 0.1 calc -dm 0 "${equation}"`).trim();

    if (this.result.length === 0) throw Error('No result generated');
  }

  launch() {
    execAsync(`wl-copy ${this.result}`);
  }

  get props() {
    return {
      icon: '',
      name: this.result,
      description: `Copy result to clipboard`
    };
  }
}

export default (query: string) : Option[] => {
  if (query.length === 0) return [];

  try {
    return [new TerminalOption(query)];
  } catch {
    return [];
  }
};
