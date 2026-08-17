# Workspace Architecture

**ThymeApp** — self-hosted location tracking combining Swarm check-ins and Lifecycle recaps (`docs/references/`).
**Package manager**: Bun (not npm/yarn). See `docs/TOOLING.md`.

## Layout

### `packages/mobile/`
Expo SDK 57 + Expo Go. SQLite + Drizzle. Primary check-in / stay UI.

### `packages/web/`
Vite + React 19. Server admin and per-user history browser.

### `packages/server/`
Bun + Elysia stub. Postgres 17 is pinned in `docker-compose.yml` for later.

### `packages/core/`
Shared domain logic. No platform imports.

### `packages/components/`
Shared UI. Keep RN-safe / universal.

### `packages/types/`
Shared TypeScript types. No runtime.

```
types ← core ← mobile
  ↑      ↑       ↑
  └─── server   web
         ↑
    components
```
