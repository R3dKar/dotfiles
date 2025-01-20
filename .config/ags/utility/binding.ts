import { bind, Binding, Variable } from 'astal';

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
