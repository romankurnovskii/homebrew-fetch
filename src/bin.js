#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import { helloWorld } from './index.js'; // https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

const parser = new ArgumentParser({
  description: 'DESCRIPTION',
});

parser.add_argument('-d', '--dir', {
  help: 'Directory to search for Python files',
  nargs: '*',
  default: ['.'],
});

parser.add_argument('--dest', {
  help: 'Destination file to save output',
  default: null,
});

// const args = parser.parse_args();
// const dirs = args.dir;
// const outputFile = args.dest;

helloWorld();
