import { spawnSync } from 'node:child_process';

const git = spawnSync('git', ['rev-parse', '--git-dir'], {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'ignore'],
});

if (git.status !== 0) {
  console.log('skip lefthook install (not a git checkout)');
  process.exit(0);
}

const install = spawnSync('lefthook', ['install'], { stdio: 'inherit' });
process.exit(install.status ?? 1);
