import { execFileSync } from 'node:child_process';

const branch = process.env.VERCEL_GIT_COMMIT_REF;
const sha = process.env.VERCEL_GIT_COMMIT_SHA;
const repo = 'https://github.com/whywbhydyq/hvac-tool-site.git';

if (branch !== 'main' || !sha) {
  process.exit(1);
}

let latest = '';
try {
  const output = execFileSync('git', ['ls-remote', repo, 'refs/heads/main'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
  latest = output.split(/\s+/)[0] || '';
} catch {
  process.exit(1);
}

process.exit(latest && sha !== latest ? 0 : 1);
