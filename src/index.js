import fs from 'fs/promises';
import path from 'path';
import simpleGit from 'simple-git';

const CASKS_REPO_NAME = 'homebrew-cask';
const CASKS_FOLDER_PREFIX = 'Casks';
const FORMULA_REPO_NAME = 'homebrew-core';
const FORMULA_FOLDER_PREFIX = 'Formula';

async function getRecentItems(limit, token, repoName, subPath) {
  const items = [];
  const headers = token ? { Authorization: `token ${token}` } : {};
  const perPage = 100;
  const maxPages = Math.ceil(limit / perPage);

  for (let page = 1; page <= maxPages; page++) {
    const repoUrl = `https://api.github.com/repos/Homebrew/${repoName}/commits?per_page=${perPage}&page=${page}`;
    const response = await fetch(repoUrl, { headers });

    if (!response.ok) {
      console.error(
        'Error fetching commits. Cloning the repository and processing locally...'
      );
      return getItemNamesFromClonedRepo(limit, repoName, subPath);
    }

    const commits = await response.json();

    for (const commit of commits) {
      if (items.length >= limit) {
        break;
      }

      const commitUrl = commit.url;
      const commitResponse = await fetch(commitUrl, { headers });
      const commitData = await commitResponse.json();

      processItemFiles(commitData.files, items, subPath);
    }
  }

  return items;
}

async function getItemNamesFromClonedRepo(limit, repoName, subPath) {
  const localPath = repoName;
  const casksPath = path.join(localPath, subPath);
  const git = simpleGit();

  try {
    await fs.access(localPath);
    await git.cwd(localPath).pull();
  } catch (error) {
    if (error.code === 'ENOENT') {
      await git.clone(`https://github.com/Homebrew/${repoName}.git`, localPath);
    } else {
      console.error('Error accessing local repository:', error);
      throw error;
    }
  }

  const files = await fs.readdir(casksPath);
  const casks = files
    .filter((file) => file.endsWith('.rb'))
    .map((file) => file.split('.rb')[0])
    .slice(0, limit);

  return { added: [], modified: casks, removed: [] };
}

function processItemFiles(
  files,
  resultItems,
  namePrefix = CASKS_FOLDER_PREFIX
) {
  // namePrefix = 'Casks' | 'Formula'

  for (const file of files) {
    if (file.filename.startsWith(namePrefix)) {
      const fileStatus = file.status;
      const caskName = file.filename.split('/').pop()?.split('.rb')[0];
      if (caskName) {
        if (resultItems[fileStatus]) {
          resultItems[fileStatus].push(caskName);
        } else {
          resultItems[fileStatus] = [caskName];
        }
      }
    }
  }
}

async function getRecentCasks(limit, token) {
  return getRecentItems(limit, token, CASKS_REPO_NAME, CASKS_FOLDER_PREFIX);
}

async function getRecentFormulas(limit, token) {
  return getRecentItems(limit, token, FORMULA_REPO_NAME, FORMULA_FOLDER_PREFIX);
}

export { getRecentItems, getRecentCasks, getRecentFormulas, processItemFiles };
