import { Elysia } from 'elysia';

const port = Number(process.env.PORT ?? 3000);

const app = new Elysia().get('/health', () => ({ ok: true as const })).listen(port);

console.log(
  `ThymeApp server listening on http://${app.server?.hostname ?? 'localhost'}:${String(app.server?.port ?? port)}`,
);
