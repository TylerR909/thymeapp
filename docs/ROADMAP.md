# Roadmap and tooling selection

**Non-binding.** This is the maximum-DX shape we would grow into, not a mandate to install these libraries now. Current, actually-running tooling lives in [`TOOLING.md`](./TOOLING.md). Product language (Swarm / Lifecycle) lives in [`references/`](./references/README.md).

One sentence: **Expo Router + Drizzle + PowerSync + TanStack Query on mobile · TanStack Router + TanStack Query on web · Joist domain + Elysia + Eden Treaty on backend · Bun workspaces · shared Zod/domain types · Lingui · React Hook Form wrappers.**

## Principles

- TypeScript everywhere.
- A schema or domain change should produce **static type errors** on backend, web, and mobile on the next typecheck — as few codegen steps as we can get away with.
- Mobile UI reads **local SQLite**. The network is how that copy stays honest, not how the screen renders.
- **Joist** owns rich domain logic and Postgres persistence. **Elysia** is the HTTP transport, not the domain model.
- **Bun workspaces** for the monorepo. Turborepo only if CI / task graphs get painful.
- **Built for Docker from day one.** Official mobile app; web + backend are what self-hosters run. No POC/MVP deploy yet, but images and Compose should exist before the API grows roots on the host.

## How this maps onto this repo

We already flattened to `packages/*` (not `apps/*`). Keep that. Suggested *roles*, not a rename:

| Path today | Role in this selection |
| --- | --- |
| `packages/mobile` | Expo Router app. Local SQLite + Drizzle is already the start. PowerSync + TanStack Query come later. |
| `packages/web` | Vite shell today. Target: TanStack Router + Query + Tailwind, Eden client. |
| `packages/server` | Elysia stub today. Target: thin handlers over **Joist** entities. Postgres 17 is already pinned in Compose. |
| `packages/types` / `packages/core` | Grow into shared Zod + domain types + API contract helpers. |
| `packages/components` | Tokens / primitives. Prefer NativeWind + Tailwind over Tamagui unless that pairing fails. |

Elysia was already in the original boilerplate. This roadmap *keeps* it as transport and adds Joist above it. It does not start a framework bake-off.

## Mobile

| Layer | Selection | Notes |
| --- | --- | --- |
| Framework | Expo | Already on SDK 57. |
| Routing | Expo Router | Already. Typed routes, deep links. |
| Local DB | Expo SQLite + Drizzle | Already. `useLiveQuery`, bundled migrations. **UI source of truth.** |
| Sync | PowerSync client SDK | Bidirectional with Postgres. Upload queue hits *our* API, never Postgres directly. Self-hosted PowerSync Service. |
| Remote/cache | TanStack Query | Same patterns as web; can sit on Drizzle and on the API. |
| Styling | NativeWind / Uniwind (or Unistyles 3) | Share a utility mental model with web Tailwind. |
| Forms | React Hook Form + thin wrappers | Shared Zod schemas; platform-specific inputs. |
| i18n | Lingui | — |
| Auth | Session / JWT against our backend | Admin-created users. |

Foreground check-ins in Expo Go stay the near-term loop. PowerSync, background Lifecycle collection, and a dev client are later.

## Web

| Layer | Selection | Notes |
| --- | --- | --- |
| Routing | TanStack Router (preferred) | File-based; keep path names close to Expo Router. Next.js only if we later need it. |
| Data | TanStack Query | Same as mobile. |
| Styling | Tailwind CSS | Pair with NativeWind. |
| Forms | React Hook Form + wrappers | Shared validation. |
| i18n | Lingui | — |
| API client | Eden Treaty | `import type { App }` from the Elysia app. |

Web is still the admin + per-user history browser. This table is how that app should be built when it becomes real.

## Backend

| Layer | Selection | Notes |
| --- | --- | --- |
| Domain / ORM | Joist | Schema-first, reactive fields, factories, N+1 safety, Unit of Work. **Postgres-only** — matches the Compose pin. |
| HTTP | Elysia | Validation, OpenAPI, Bun. Handlers call Joist; they do not own business rules. |
| Client types | Eden Treaty | `export type App = typeof app`. Zero/minimal codegen into web and RN. |
| Database | Postgres 17 | Already pinned. |
| Optional extra client | OpenAPI + Orval | Only if Eden is not enough for generated hooks. |
| Auth | Argon2id hashes + sessions/JWT | Admin creates users / family / managed accounts. No public self-serve signup assumed. |
| Logs | Structured (pino or similar) → stdout | Self-hosters ship logs wherever they want. No forced APM. |

GraphQL via Joist is available and **not required**.

## Sync (when we mean it)

```
SQLite (Drizzle)  ←→  PowerSync SDK
                         │
                         │  upload queue
                         ▼
                   Elysia API  →  Joist  →  Postgres
                         ▲
                         │  replication / buckets
                  PowerSync Service (self-hosted)
```

Clients do not talk to Postgres on the sync path. PowerSync is a service + SDK, not a library you drop into SQLite.

This is **not** week-one work. Local Drizzle without sync is enough until check-ins exist.

## Docker (do soon — hard to bolt on later)

Distribution model: **one official mobile app**; **self-hosted web + backend**. Self-hosters should paste a Compose file and get a running instance. The app is nowhere near a deployable POC, but “runs in Docker” is a day-1 *shape*, not a launch-week surprise.

**Three services, three containers.** Do not stuff the Vite/static web UI into the API image.

| Service | Image / role | Deploy | Local extra |
| --- | --- | --- | --- |
| `postgres` | Official `postgres:17` | One volume, one DB | Disposable volume; reset / migrate / `pg_restore` / reseed on demand |
| `server` | Our Bun + Elysia (+ Joist later) image | App only | Same image; talks to local Postgres |
| `web` | Static or Vite-built frontend | Serves the admin + history UI | Same image or `bun start` on the host against Docker Postgres |

Two Compose files (or one file + override), not one compromise:

- **`compose.yaml` (self-host)** — postgres + server + web. Boring. No test databases, no seed jobs, no bind-mount of the monorepo.
- **`compose.dev.yaml` (local)** — same three, plus a Postgres you can wipe. Scripts: `db:reset`, `db:migrate`, `db:restore`, `db:seed`. Joist unit tests use a **real** Postgres (flush schema, then truncate/reset between tests). That test database is **dev/CI only** — it does not ship in the self-host file.

Today `packages/server/docker-compose.yml` is only the Postgres pin. Promote this to repo-root Compose + Dockerfiles for `server` and `web` in the next infra pass (can land in parallel with the UI foundation PR and with product docs).

Mobile is **not** containerized for self-hosters. Dev Container remains optional; host `bun start` is still the Expo loop.

## Type-safety flow (the actual DX goal)

1. Migration / schema change.
2. Joist codegen updates entities.
3. Elysia route schemas / DTOs update.
4. `App` type (Eden) and/or shared Zod types update.
5. Web + mobile typecheck goes red.
6. Mobile Drizzle schema stays aligned via shared definitions or a small generate step.

If a proposed library does not participate in that loop, it is a hard sell.

## Shared, later, or never (for now)

- **Push notifications** — after real App Store / Play distribution.
- **Observability** — stdout logs only until someone self-hosting asks for more.
- **Module federation / microfrontends** — no. Packages + imports.
- **Tamagui** — only if NativeWind + shared tokens are clearly not enough.
- **GraphQL** — only if the Joist plugin is clearly better than Eden + Query for our reads.
- **Turborepo** — only if `bun` scripts + CI become slow.

## Next code passes (still not product)

1. **UI foundations** — TanStack Router, NativeWind + Tailwind, Lingui, UUID-shaped local schema. No real screens required.
2. **Docker** — root `compose.yaml` + `compose.dev.yaml`, Dockerfiles for server and web, reset/migrate/restore/seed scripts, Joist-ready test DB story. Postgres-only in deploy; full reset machinery in local.

## What this does *not* change today

Do not add Joist, PowerSync, TanStack, Lingui, NativeWind, or Eden in the modernization PR. The running stack stays: Expo Router, Drizzle/SQLite, Vite scaffold, Elysia `/health`, Bun workspaces, Jest on mobile, `bun test` on core/web. The existing server Compose file is a Postgres pin only.
