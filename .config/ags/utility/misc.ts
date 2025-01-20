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
