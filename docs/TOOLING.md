# Tooling and layout

Product vocabulary (Swarm / Lifecycle): [`references/`](./references/README.md).

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Package manager | **Bun 1.3.14** (`.bun-version`) | Workspaces + Elysia runtime. Pin with `.bun-version`; CI reads that file. No nvm-style auto-switch. |
| Linker | hoisted (`bunfig.toml`) | Isolated is Bun’s modern default, but Expo Doctor still flags same-version native duplicates. |
| Node | **>=22.13** (`.node-version` = 24) | Expo 57 minimum. |
| Language | **TypeScript ~6.0.3** | Expo / typescript-eslint pin `<6.1`. Do not move to 7 until 7.1. |
| Mobile | **Expo SDK 57 + Expo Router** | RN 0.86, React 19.2, expo-sqlite 57. |
| Mobile data | **SQLite + Drizzle 0.45** | Latest stable. Drizzle 1.0 is beta. |
| Web | **Vite + React 19** | Admin + history browser. Scaffold only. |
| Server | **Bun + Elysia 1.4** | Already in the original boilerplate; stub + `/health`. Postgres 17 is pinned in Compose. Elysia 2 is beta. |
| Tests | **`bun test`** (core, web) + **Jest / jest-expo** (mobile) | Bun cannot load React Native. `bun test` from root ignores `packages/mobile`. |
| Hooks | **Lefthook** | Staged ESLint + type-check + Jest. |
| License | **AGPL-3.0-only** | Self-hosted network app. |

## Commands

Same names in every package: `start`, `lint`, `lint:fix`, `type-check`, `precheck`. Runnables also have `smoke`.

From the repo root:

```bash
bun start       # mobile + web + server
bun precheck    # type-check + lint
bun test        # core + web
cd packages/mobile && bun run test   # jest-expo
```

`start` is Metro / Vite / `bun --hot`. It is not `expo run:ios`.

## How to run mobile

Do it on the **host**, not in the Dev Container.

1. `cd packages/mobile && bun start`
2. Press `i` → iOS Simulator. Expo CLI installs the **SDK 57** Simulator Expo Go if needed.
3. Physical phone: App Store Expo Go is frozen at **SDK 54**. Get SDK 57 Go from [expo.dev/go](https://expo.dev/go), [sign.expo.dev](https://sign.expo.dev/), or `eas go`. Put the Mac LAN IP in `.env.local` as `REACT_NATIVE_PACKAGER_HOSTNAME`.

`expo start` only starts Metro. LAN IP is for a real device (or Metro-in-Docker). Simulator on the host can use localhost.

A **development build** is for later: background location, or when Expo Go is too far behind.

## Layout

```
packages/mobile      Expo app
packages/web         Vite admin + history (scaffold)
packages/server      Elysia stub + Postgres 17 Compose pin
packages/core        Shared domain (no platform imports)
packages/components  Shared UI
packages/types       Shared types
docs/references      Swarm / Lifecycle recaps
```

Shared `tsconfig.json` and ESLint style live at the repo root. Packages only add Hermes (`ES2022` + `react-native` conditions), DOM (web), or `types: ["bun"]` (server). React hook rules apply to mobile/web only.

## Decisions that are *not* needed yet

- How the server owner is blocked from reading location (RLS vs encryption)
- Sync protocol
- Federation
- Development builds, unless Expo Go or background location forces it
- A full offline-first engine
