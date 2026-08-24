# Local Postgres + Compose

Laptop: `docker-compose.yaml` + `.env` (Compose finds both by name). Self-host: copy `docker-compose.example.yml`.

## Today

```bash
bun install
bun db          # postgres up --wait
bun start       # postgres + server (bun --hot) + web (Vite)
bun urls        # print the host ports Docker assigned
bun psql        # compose exec — no published port needed
```

Mobile stays on the host (`bun start:mobile`).

Postgres has no app tables. `GET /health` is process liveness. `GET /ready` runs `SELECT 1` against Postgres.

| | |
| --- | --- |
| Superuser | `dbadmin` / `thymeapp-admin` (Compose-only) |
| App role | `DB_USER` / `DB_PASSWORD` from `.env` |
| Databases | `thymeapp` (dev) + `thymeapp_tests_*` (tests; not a second service) |
| Host ports | omitted in Compose — Docker picks a free port per stack |

No named volume locally. `bun redb` drops and recreates the app databases. Self-host uses a named volume.

## Files

```
.env.example                 # committed template
.env                         # gitignored; Conductor copies it into worktrees
.worktreeinclude             # which gitignored files to copy (`.env`, `.env.local`)
docker-compose.yaml          # local: postgres + server + web (bind-mount)
docker-compose.example.yml   # self-host copy-paste: postgres + one app image
Dockerfile                   # release: API + Vite build in one image
docker/postgres/             # local image: create/reset thymeapp + tests_*
Makefile                     # bun start / db / redb / psql / urls
```

Do not pass `-f` to `docker compose`. Do not set `name:` — the worktree directory is the project name.

`.env` is gitignored. Copy once from `.env.example` in the main checkout. Conductor copies it into new worktrees via [`.worktreeinclude`](../.worktreeinclude). The server container gets credentials from `.env` via `env_file:`. It talks to Postgres at Compose DNS `postgres:5432`, not via `DB_HOST`.

## Worktrees

Different folders → different Compose project names → isolated networks, containers, and volumes. Host ports are Docker’s ephemeral range, so two stacks can be up at once.

Internal traffic stays on fixed container ports and Compose DNS (`postgres:5432`, `server:3000`). `bun psql` uses `compose exec`.

Browser: `bun urls`, or `docker compose port web 5173`.

## Mental model

```
host                         compose
----                         -------
bun start                    postgres   (dev + test databases)
                             server     oven/bun + bun --hot
                             web        oven/bun + Vite HMR

release / VPS                postgres:18
                             app        ghcr.io/tylerr909/thymeapp (API + UI)
```

## Commands

| bun | what |
| --- | --- |
| `start` | `docker compose up postgres server web` |
| `urls` | print `localhost` URLs for the published ports |
| `start:mobile` | Expo on the host |
| `db` | `up --wait postgres` |
| `redb` | drop/recreate `thymeapp` + `thymeapp_tests_*` |
| `psql` | `thymeapp` |

`--wait` needs `pg_isready -h 127.0.0.1`. Host `bun install`; do not `compose exec server bun add`.

Vite is published on a random host port. Open the `web:` line from `bun urls`. If HMR’s websocket still aims at 5173, hard-refresh; that is Vite baking the container port, not Compose.

## Self-host

Copy `docker-compose.example.yml` to `docker-compose.yaml` and fill a `.env` (required keys are in a comment at the top of the example). One image: `ghcr.io/tylerr909/thymeapp:${THYMEAPP_TAG}`. That process serves `/health` plus `WEB_ROOT` (the Vite build) on `SERVER_PORT`. CI does not publish that tag yet. `docker build -t thymeapp:local .` builds the image locally.

## Later

- Real migrations: dump first, migrate `DB_DATABASE`, then every `thymeapp_tests_%` via `compose exec`.
- Joist `createFlushFunction` on the test DBs. Codegen reads `thymeapp_tests_1`. Tests `COMMIT` + `beforeEach` → `flush_database()`.
- `TEST_PARALLELISM` is already runtime env. `bun redb` after changing it.
- GHCR publish of the single image.
- No `schema.sql` rollup until migrate is slow. No second Postgres service. No Expo in Compose.
