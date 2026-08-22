// organize-imports-ignore — configure LogTape before any other app module. Bun 1.4 has Temporal.
import { log } from './log';
import { elysiaLogger } from '@logtape/elysia';
import { Elysia } from 'elysia';
import { pingPostgres, postgresEndpoint } from './postgres';

if (typeof Temporal === 'undefined') {
  throw new Error('ThymeApp server requires Temporal (Bun 1.4+).');
}

const port = Number(process.env.PORT ?? 3000);
const webRoot = process.env.WEB_ROOT;

const app = new Elysia()
  .use(
    elysiaLogger({
      category: ['thymeapp', 'http'],
      skip: ctx => ctx.path === '/health' || ctx.path === '/ready',
    }),
  )
  .get('/health', () => ({ ok: true as const }))
  .get('/ready', async ({ set }) => {
    try {
      await pingPostgres();
      return { ok: true as const };
    } catch (error) {
      set.status = 503;
      log.warn('postgres not ready: {error}', { error: String(error) });
      return { ok: false as const };
    }
  });

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
    host: postgresEndpoint.hostname,
    port: postgresEndpoint.port,
    database: process.env.DB_DATABASE ?? null,
  },
});
