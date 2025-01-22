import { LauncherOptionProps } from "./LauncherOption";

export interface Option {
  launch: () => void;
  readonly props: Omit<LauncherOptionProps, 'selected'>;
};
