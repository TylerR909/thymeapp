import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';

// Parallel threads each get a Metro port. Offset stays in 8081–8180.
const base = process.env.T3CODE_WORKTREE_PATH ?? process.cwd();
const offset = createHash('sha256').update(base).digest().readUInt16BE(0) % 100;
const port = 8081 + offset;

console.log(`Metro on port ${port}`);

const child = spawn('bun', ['--filter', '@thymeapp/mobile', 'start', '--', '--port', String(port)], {
  stdio: 'inherit',
});

child.on('error', error => {
  console.error(error.message);
  process.exit(1);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on('exit', (code, signal) => {
  if (signal !== null) process.exit(1);
  process.exit(code ?? 1);
});
