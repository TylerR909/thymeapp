# Roadmap and tooling selection

**Non-binding.** This is the maximum-DX shape we would grow into, not a mandate to install these libraries now. Current, actually-running tooling lives in [`TOOLING.md`](./TOOLING.md). Product language (Swarm / Lifecycle) lives in [`references/`](./references/README.md).

One sentence: **Expo Router + Drizzle + PowerSync + TanStack Query on mobile · TanStack Router + TanStack Query on web · Joist domain + Elysia + Eden Treaty on backend · Bun workspaces · shared Zod/domain types · Lingui · React Hook Form wrappers.**

## Principles

- TypeScript everywhere.
- A schema or domain change should produce **static type errors** on backend, web, and mobile on the next typecheck — as few codegen steps as we can get away with.
- Mobile UI reads **local SQLite**. The network is how that copy stays honest, not how the screen renders.
- **Joist** owns rich domain logic and Postgres persistence. **Elysia** is the HTTP transport, not the domain model.
- **Bun workspaces** for the monorepo. Turborepo only if CI / task graphs get painful.

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

## What this does *not* change today

Do not add Joist, PowerSync, TanStack, Lingui, NativeWind, or Eden in the modernization PR. The running stack stays: Expo Router, Drizzle/SQLite, Vite scaffold, Elysia `/health`, Bun workspaces, Jest on mobile, `bun test` on core/web.
