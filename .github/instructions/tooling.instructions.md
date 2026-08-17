# Development Tooling

Canonical stack: `docs/TOOLING.md`.

From a package: `bun start`, `bun lint`, `bun type-check`, `bun test`, `bun precheck`.

From the repo root:

```bash
bun install
bun start          # mobile + web + server
bun precheck       # type-check + lint
bun run test       # all Jest suites
bun smoke
```

- **Bun** workspaces — never npm/yarn
- **TypeScript 6** (not 7). Shared `tsconfig.json`; packages only add Hermes / DOM / Bun types
- **ESLint 9** + Prettier. Shared style; React hooks only on mobile/web
- **Lefthook** — staged ESLint + type-check
- **Jest** everywhere (`jest-expo` in mobile). Use `bun run test`, not `bun test`
- **Expo SDK 57.** App Store Expo Go is SDK 54 — use Simulator (`bun start` then `i`) or expo.dev/go / sign.expo.dev on a phone
- Vite for web. Prefer **host** Bun for mobile; the Dev Container cannot launch Simulator.app
