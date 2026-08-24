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
| `packages/server` | Elysia stub today. Target: thin handlers over **Joist** entities. Postgres 18 is already pinned in Compose. |
| `packages/types` | Shared Zod / domain types when two apps import them. |
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

Foreground check-ins on a Debug development build stay the near-term loop. PowerSync and background Lifecycle collection are later.

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
| Database | Postgres 18 | Already pinned. |
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

**Release is two containers:** official Postgres + one app image (API serves the built UI). **Local is three processes:** Postgres (dev + test databases), backend, Vite.

| Service | Image / role | Deploy | Local extra |
| --- | --- | --- | --- |
| `postgres` | Official `postgres:18` | One volume, one DB | Wipeable; `thymeapp` + `thymeapp_tests_*` |
| `app` (release) | One Bun image: Elysia + Vite `dist` | API and UI on the same port | — |
| `server` / `web` (local) | Bind-mounted `oven/bun` | — | `bun --hot` + Vite HMR |

Shipped (see [`LOCAL-DB.md`](./LOCAL-DB.md)):

- **Local** — `docker-compose.yaml` + `.env`. Three processes: Vite+HMR, backend, one Postgres (dev + test databases). Worktrees are separate Compose projects; host ports are ephemeral (`bun urls`).
- **Release / self-host** — `docker-compose.example.yml`. Official `postgres:18` + **one** `ghcr.io/tylerr909/thymeapp` image (API serves the Vite build). CI does not publish that tag yet.

Still later: real migrations, dump-before-migrate, Joist `flush_database()` on the test DBs, GHCR publish.

Mobile is **not** containerized. Dev Container remains optional; Expo is `bun start:mobile` on the host.

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
- **Observability beyond stdout** — `@thymeapp/logging` is in. Disk rotation, offline upload, and admin ingest wait.
- **Module federation / microfrontends** — no. Packages + imports.
- **Tamagui** — only if NativeWind + shared tokens are clearly not enough.
- **GraphQL** — only if the Joist plugin is clearly better than Eden + Query for our reads.
- **Turborepo** — only if `bun` scripts + CI become slow.

## Next code passes (still not product)

1. **UI foundations** — TanStack Router, NativeWind + Tailwind, web Lingui, UUID-shaped local schema. No real screens required. Mobile Lingui + the EAS / Xcode device path are already in.
2. **Joist + real migrations** — fan-out migrate, dump-before-migrate, `flush_database()` on `thymeapp_tests_*`. Compose / empty Postgres / self-host file are already in.

## What this does *not* change today

Do not add Joist, PowerSync, TanStack, NativeWind, or Eden unless the task is that pass. Mobile Lingui, EAS / Xcode, LogTape, and the Compose/Postgres shape are already in. The rest of the running stack stays: Expo Router, Drizzle/SQLite, Vite scaffold, Elysia `/health`, Bun workspaces, Jest (`bun run test`).
