# ThymeApp

<img src="docs/assets/icon.png" alt="ThymeApp icon: a map pin with a thyme sprig" width="96" height="96" />

Self-hosted location tracking: [Foursquare Swarm](docs/references/swarm.md)–style check-ins plus [Life Cycle](docs/references/lifecycle.md)–style recaps. See [docs/references](docs/references/README.md), [docs/TOOLING.md](docs/TOOLING.md) (what runs today), and [docs/ROADMAP.md](docs/ROADMAP.md) (non-binding future stack).

Licensed under the [GNU Affero General Public License v3.0](LICENSE).

## Requirements

- **Bun** `1.4.0` (see `.bun-version`). Upgrade with `bun upgrade`.
- **Node.js** 22.13+ (24 recommended; see `.node-version`)

## Layout

- **`packages/mobile/`** — Expo SDK 57 app
- **`packages/web/`** — Vite admin + history browser (scaffold)
- **`packages/server/`** — Bun + Elysia stub. Local Postgres via Compose. Release image also serves the web UI.
- **`packages/logging/`** — LogTape (`createLogger`, redacted console; unit tests intercept)
- **`packages/components/`**, **`packages/types/`** — empty until two apps share UI or Zod/DTOs

## Quick start (host)

Run this on the Mac, not inside the Dev Container.

```bash
bun install
bun db             # Postgres (thymeapp + thymeapp_tests_1)
bun start          # Compose: postgres + server + web
bun urls           # host ports Docker assigned
bun start:mobile   # Expo / Metro — then press `i` for iOS Simulator
```

Inside a package, `bun start` is still that package on the host (`packages/mobile` = Metro, `packages/server` = `bun --hot`, `packages/web` = Vite). Root `bun start` is Compose only. Details: [`docs/LOCAL-DB.md`](docs/LOCAL-DB.md). `bun precheck` is type-check + lint. `bun run test` is Jest (mobile, web, server, shared packages). `test/setupTests.ts` registers `toHaveLogged`.

## Mobile

Not Expo Go. Development build, same as Expo’s docs:

```bash
cd packages/mobile
bun run ios                 # compile + install + Metro (Simulator)
bun run ios -- --device     # same, iPhone
bun start                   # later: Metro only, then `i`
```

## Dev Container

Optional Linux box. It cannot launch Simulator.app. Prefer host `bun start:mobile` for Expo.
