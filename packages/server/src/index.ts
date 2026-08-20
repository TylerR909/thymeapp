import { Elysia } from 'elysia';
import { log } from './log';

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

log.info('ThymeApp server listening', {
  host: app.server?.hostname ?? '0.0.0.0',
  port: app.server?.port ?? port,
  webRoot: webRoot ?? null,
  db: {
    host: process.env.DB_HOST ?? null,
    port: process.env.DB_PORT ?? null,
    database: process.env.DB_DATABASE ?? null,
  },
});
