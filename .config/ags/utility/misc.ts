import { bind, Binding, Variable } from 'astal';

export type Prefix = '' | 'k' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';

export const convertWithPrefix = (value: number): [number, Prefix] => {
  const prefixes: Prefix[] = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  let prefixIndex = 0;
  while (value.toFixed(0).length >= 4 && prefixIndex + 1 < prefixes.length) {
    value /= 1024;
    prefixIndex++;
  }

  return [value, prefixes[prefixIndex]];
};


export const bindify = <T>(target: T | Binding<T>) : Binding<T> => {
  if (target instanceof Binding)
    return target;
  else
    return bind({ get: () => target, subscribe: () => () => {} });
};

export const classList = (classes: Record<string, boolean | Binding<boolean>>): Variable<string> => {
  const classList = Object.keys(classes);
  const bindList = classList.map(className => bindify(classes[className]));

  return Variable.derive(bindList, (...enabledList) => classList.filter((_, index) => enabledList[index]).join(' '));
};
