<center>
<h1 align="center">homebrew-fetch<br></h1>

Fetch recent casks and formulas from Homebrew repositories.

<p align="center">
  <img src="https://github.com/romankurnovskii/BrewMate/blob/main/assets/icon1024nocorner.png?raw=true" alt="homebrew-fetch"
  width="150">
</p>

</center>


[![NPM version][npm-image]][npm-url]
![npm-javascript]
[![License][github-license]][github-license-url]


## About

`homebrew-fetch` is a Node.js package that fetches recent casks and formulas from Homebrew repositories. It provides an API that allows you to retrieve the latest casks and formulas with an optional limit, and it supports GitHub personal access tokens for authentication.

## 🌟 Features

- Fetch recent casks and formulas from Homebrew repositories
- Support for GitHub personal access tokens

## 📖 Usage


```js
import { getRecentCasks, getRecentFormulas } from 'homebrew-fetch';

const casks = await getRecentCasks(10);
console.log('Recent Casks:', casks);

const formulas = await getRecentFormulas(10);
console.log('Recent Formulas:', formulas);
```

## Usage (global module)

```
homebrew-fetch --help
homebrew-fetch --casks [--limit <limit>] [--token <token>]
homebrew-fetch --formulas [--limit <limit>] [--token <token>]

homebrew-fetch --casks --limit 10

homebrew-fetch --formulas --token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN

# get token from here https://github.com/settings/tokens
export GITHUB_TOKEN=....

homebrew-fetch --formulas

# if no token, script will run git clone before


homebrew-fetch --formula --limit 100

# Recent Formulas: [
#   modified: [
#     'libxml2',           'libxml2',           'exploitdb',
#     'protolint',         'ada-url',           'cdk8s',
# ]


homebrew-fetch --cask

# Recent Casks: [
#   modified: [
#     'hackolade',           'thunder',               'readmoreading',
#     '4k-video-downloader', 'ipepresenter',          'ipe',
#   ],
#   removed: [ 'shellhere', 'movist', 'max', 'prismatik' ],
#   added: [ 'submariner', 'entry' ]
# ]
```

## 🛠️ Installation

```sh
npm install homebrew-fetch

# for global usage
npm install -g homebrew-fetch
```

or

```sh
yarn add homebrew-fetch
```

## API

- **getRecentCasks(limit?: number, token?: string)** => Promise<object>
- **getRecentFormulas(limit?: number, token?: string)** => Promise<object>


[package-name]: homebrew-fetch
[npm-url]: https://www.npmjs.com/package/[package-name]
[npm-image]: https://img.shields.io/npm/v/homebrew-fetch
[github-license]: https://img.shields.io/github/license/romankurnovskii/homebrew-fetch
[github-license-url]: https://github.com/romankurnovskii/homebrew-fetch/blob/main/LICENSE
[npm-javascript]: https://img.shields.io/npm/types/homebrew-fetch
[build-status]: https://github.com/romankurnovskii/homebrew-fetch/workflows/CI/badge.svg
[build-status-url]: https://github.com/romankurnovskii/homebrew-fetch
[install-size]: https://packagephobia.com/badge?p=homebrew-fetch
[install-size-url]: https://packagephobia.com/result?p=homebrew-fetch
