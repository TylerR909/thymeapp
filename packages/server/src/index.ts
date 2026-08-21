// organize-imports-ignore — configure LogTape before any other app module
import { log } from './log';
import { Elysia } from 'elysia';

const port = Number(process.env.PORT ?? 3000);
const webRoot = process.env.WEB_ROOT;

const app = new Elysia().get('/health', () => ({ ok: true as const }));

if (webRoot !== undefined && webRoot !== '') {
  const root = webRoot;
  app.get('/*', async ({ path }) => {
    const rel = path === '/' ? '/index.html' : path;
    const file = Bun.file(`${root}${rel}`);
    if (await file.exists()) return file;
    return Bun.file(`${root}/index.html`);
  });
}

app.listen({ hostname: '0.0.0.0', port });

log.info('ThymeApp server listening on {host}:{port}', {
  host: app.server?.hostname ?? '0.0.0.0',
  port: app.server?.port ?? port,
  webRoot: webRoot ?? null,
  db: {
    host: process.env.DB_HOST ?? null,
    port: process.env.DB_PORT ?? null,
    database: process.env.DB_DATABASE ?? null,
  },
});
