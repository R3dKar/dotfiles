import { Option } from './option';

import AppModule from './app/AppModule';
import CalculatorModule from './calculator/ClaculatorModule';
import TerminalModule from './terminal/TerminalModule';

const modules = [
  AppModule,
  CalculatorModule,
  TerminalModule
];

const MAX_RESULTS = 8;

export const search = (query: string): Option[]=> {
  const results: Option[] = [];

  modules.forEach(module => results.push(...module(query)));

  return results.slice(0, MAX_RESULTS);
};
