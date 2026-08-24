# Development Tooling

Canonical stack: `docs/TOOLING.md`.

From a package: `bun start`, `bun lint`, `bun type-check`, `bun test`, `bun precheck`.

From the repo root:

```bash
bun install
bun start          # Compose: postgres + server + web
bun start:mobile   # host Expo
bun db             # postgres up
bun precheck       # type-check + lint
bun test           # core + web (Bun)
cd packages/mobile && bun run test   # jest-expo
```

- **Bun** workspaces — never npm/yarn
- **TypeScript 6** (not 7). Shared `tsconfig.json`; packages only add Hermes / DOM / Bun types
- **ESLint 9** + Prettier. Shared style; React hooks only on mobile/web
- **Lefthook** — staged ESLint + type-check
- **`bun test`** for core/web. Mobile stays on Jest (`jest-expo`) because Bun cannot load React Native
- **Expo SDK 57 development builds** (not Expo Go). `cd packages/mobile && bun run ios`. Then `bun start` + `i`. No committed `ios/` (CNG). Root `bun start` is Compose.
- **Lingui 6** on mobile. New user-facing strings use `<Trans>` / `t\`...\``; run `bun run i18n:extract`.
- **tslog** via `@thymeapp/logging`. Leaf package — no `@thymeapp/*` imports. Apps instantiate with `createLogger`.
- Vite for web. Prefer **host** Bun for mobile; the Dev Container cannot launch Simulator.app
