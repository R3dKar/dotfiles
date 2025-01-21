import { Gdk } from 'astal/gtk3';
import { bind, Binding, Variable } from 'astal';
import { bindify, classList } from '@/utility/binding';
import Hyprland from 'gi://AstalHyprland';

import Icon from '@/widgets/icon/Icon';

const hyprland = Hyprland.get_default();

export interface WorkspaceItemProps {
  workspace: Hyprland.Workspace,
  visible: boolean | Binding<boolean>,
  active: boolean | Binding<boolean>,
  empty: boolean | Binding<boolean>
};

const WorkspaceItem = ({ workspace, visible, active, empty }: WorkspaceItemProps) => {
  const activeBind = bindify(active);

  const workspaceLabel = Variable.derive(
    [activeBind, bindify(empty)],
    (active, empty) => {
      if (active || !empty)
        return <label>{workspace.id}</label>;

      return <Icon size={14} icon='●'/>;
    }
  );

  const className = classList({
    'workspace': true,
    'workspace_active': activeBind
  });

  const onClick = () => {
    if (activeBind.get()) return;
    workspace.focus();
  };

  const onDestroy = () => {
    className.drop();
    workspaceLabel.drop();
  };

  return (
    <eventbox
      visible={visible}
      className={className()}
      onClickRelease={onClick}
      onDestroy={onDestroy}
      cursor='pointer'
    >
      {workspaceLabel()}
    </eventbox>
  );
};

export interface HyprlandInfoProps {
  monitor: Gdk.Monitor
};

export default ({ monitor }: HyprlandInfoProps) => {
  const currentMonitor = hyprland.get_monitors().find(hyprlandMonitor => hyprlandMonitor.model === monitor.model)!;

  return (
    <box spacing={10}>
      {bind(hyprland, 'workspaces').as(workspaces => workspaces.filter(a => a.id > 0).sort((a, b) => a.id - b.id).map(workspace => {
        const visible = bind(workspace, 'monitor').as(monitor => monitor.id === currentMonitor.id);
        const active = bind(hyprland, 'focusedWorkspace').as(focused => workspace.id === focused.id);
        const empty = bind(workspace, 'clients').as(clients => clients.length === 0);

        return <WorkspaceItem workspace={workspace} visible={visible} active={active} empty={empty}/>
      }))}
    </box>
  );
};
