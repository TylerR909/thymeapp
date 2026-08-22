import { spawn } from 'node:child_process';

const port = Number(process.env.PORT ?? 3458);
const child = spawn(process.execPath, ['src/index.ts'], {
  env: { ...process.env, PORT: String(port) },
  stdio: 'inherit',
});

const deadline = Temporal.Now.instant().add({ milliseconds: 8000 });
let ready = false;

while (Temporal.Instant.compare(Temporal.Now.instant(), deadline) < 0) {
  try {
    const res = await fetch(`http://127.0.0.1:${String(port)}/health`);
    const body: unknown = await res.json();
    if (res.ok && typeof body === 'object' && body !== null && 'ok' in body && body.ok === true) {
      ready = true;
      break;
    }
  } catch {
    // still starting
  }
  await Bun.sleep(150);
}

child.kill();
if (!ready) {
  throw new Error(`server /health did not become ready on :${String(port)}`);
}

console.log('server /health ok');
