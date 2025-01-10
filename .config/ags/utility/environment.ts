import envFile from 'inline:../.env';
import envFileExample from 'inline:../.env.example';

const lineRegex = /^(?<param>\w+)\s*=\s*(?<quote>['"]?)(?<value>.*)\k<quote>\s*/gm;

let data: Record<string, string> = {};

const envLineMatches = envFile.split('\n').map(line => line.trim()).join('\n').matchAll(lineRegex)

for (const line of envLineMatches) {
  const [, parameter, , value] = line;
  data[parameter] = value;
}

const envLineExampleMatches = envFileExample.split('\n').map(line => line.trim()).join('\n').matchAll(lineRegex);

for (const line of envLineExampleMatches) {
  const [, parameter] = line;
  if (!(parameter in data)) throw new Error(`Parameter "${parameter}" is not set`);
}

export const env = data;
