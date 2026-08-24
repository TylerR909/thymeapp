# Agent notes

Read [`docs/TOOLING.md`](docs/TOOLING.md) for what runs today. [`docs/DEPENDENCIES.md`](docs/DEPENDENCIES.md) for why we are not on the next TypeScript / Jest / RN / Elysia / Drizzle. [`docs/ROADMAP.md`](docs/ROADMAP.md) is a **non-binding** future stack (Joist, PowerSync, Eden, etc.) — do not install those unless the task says to. Bun workspaces, not npm/yarn.

Product language:

- **Swarm** / **Foursquare Swarm** → [`docs/references/swarm.md`](docs/references/swarm.md)
- **Lifecycle** / **Life Cycle** / **LifeCycle** → [`docs/references/lifecycle.md`](docs/references/lifecycle.md)
- How this repo combines them → [`docs/references/README.md`](docs/references/README.md)

If a task mentions Swarm, Lifecycle, check-ins, recaps, slices, stickers, mayorships, or “open after months and it still knows,” read those files first.

Root `bun start` is Docker Compose (postgres + server + web). Mobile is **host** `cd packages/mobile && bun run ios` (development build, not Expo Go). `bun start` is Metro only; `i` opens the installed client. Do not commit `ios/` or `android/` (CNG). User-facing strings go through Lingui (`<Trans>` / `t\`...\``), then `bun run i18n:extract`. Logging is `@thymeapp/logging` (`createLogger`). That package must not import other `@thymeapp/*` packages. Do not log RLS-private user data. Jest (`bun run test`) registers `toHaveLogged` via `test/setupTests.ts`. Assert with `expect().toHaveLogged('...')`; do not mock `Logger`. Do not use `bun test` (Bun's own runner). Use `Temporal`, not `Date`. Polyfill `temporal-polyfill/global` at the web and mobile entries (Hermes / browsers). Bun 1.4 already has Temporal; do not polyfill the server.
