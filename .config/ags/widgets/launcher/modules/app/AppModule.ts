import Apps from 'gi://AstalApps';
import { Option } from '@/widgets/launcher/modules/option';

export class ApplicationOption implements Option {
  constructor(private application: Apps.Application) {}

  launch() {
    this.application.launch();
  }

  get props() {
    return {
      icon: this.application.iconName,
      name: this.application.name,
      description: this.application.description,
    };
  }
}

const apps = new Apps.Apps();

const BLACKLIST = [
  'lstopo.desktop',
  'bvnc.desktop',
  'qv4l2.desktop',
  'avahi-discover.desktop',
  'bssh.desktop',
  'electron32.desktop',
  'qvidcap.desktop'
];

export default (query: string): Option[] => {
  return apps.fuzzy_query(query)
  .filter(app => !BLACKLIST.includes(app.entry))
  .map(app => new ApplicationOption(app));
};
