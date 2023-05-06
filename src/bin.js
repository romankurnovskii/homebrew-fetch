#!/usr/bin/env node
import { ArgumentParser } from 'argparse';
import { getRecentCasks, getRecentFormulas } from './index.js'; // https://nodejs.org/api/esm.html#esm_mandatory_file_extensions

const parser = new ArgumentParser({
  description: 'Fetch recent casks and formulas from Homebrew repositories',
});

parser.add_argument('-l', '--limit', {
  type: 'int',
  default: 10,
  help: 'Limit the number of casks/formulas to fetch',
});

parser.add_argument('-t', '--token', {
  help: 'GitHub personal access token to access the repositories. Or tries to read env GITHUB_TOKEN',
});

parser.add_argument('--casks', {
  action: 'store_true',
  help: 'Fetch recent casks',
});

parser.add_argument('--formulas', {
  action: 'store_true',
  help: 'Fetch recent formulas',
});

const args = parser.parse_args();

(async () => {
  let token = args.token;
  if (!token) {
    token = process.env.GITHUB_TOKEN;
  }

  if (args.casks) {
    const casks = await getRecentCasks(args.limit, token);
    console.log('Recent Casks:', casks);
  }

  if (args.formulas) {
    const formulas = await getRecentFormulas(args.limit, token);
    console.log('Recent Formulas:', formulas);
  }
})();
