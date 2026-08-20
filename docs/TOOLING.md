# Tooling and layout

Product vocabulary (Swarm / Lifecycle): [`references/`](./references/README.md). Non-binding future stack: [`ROADMAP.md`](./ROADMAP.md).

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Package manager | **Bun 1.3.14** (`.bun-version`) | Workspaces + Elysia runtime. Pin with `.bun-version`; CI reads that file. No nvm-style auto-switch. |
| Linker | hoisted (`bunfig.toml`) | Isolated is Bun’s modern default, but Expo Doctor still flags same-version native duplicates. |
| Node | **>=22.13** (`.node-version` = 24) | Expo 57 minimum. |
| Language | **TypeScript ~6.0.3** | Expo / typescript-eslint pin `<6.1`. Do not move to 7 until 7.1. |
| Mobile | **Expo SDK 57 + Expo Router** | RN 0.86, React 19.2. Development builds (`expo-dev-client`), not Expo Go. |
| Mobile i18n | **Lingui 6** | Catalogs in `packages/mobile/src/locales`. Web Lingui is still later. |
| Device builds | **Local Xcode (7-day) + EAS project** | EAS project `43103bb3-73ff-45dc-942c-da48c97d1c56`. Cloud iOS device builds need a paid Apple Developer Program membership. |
| Mobile data | **SQLite + Drizzle 0.45** | Latest stable. Drizzle 1.0 is beta. |
| Web | **Vite + React 19** | Admin + history browser. Scaffold only. |
| Server | **Bun + Elysia 1.4** | Stub + `/health`. Local run is Compose (`bun start`). Elysia 2 is beta. |
| Postgres | **18** (Compose) | One instance, `thymeapp` + `thymeapp_tests_*`. Host ports are ephemeral (`bun urls`). See [`LOCAL-DB.md`](./LOCAL-DB.md). |
| Tests | **`bun test`** (core, web) + **Jest / jest-expo** (mobile) | Bun cannot load React Native. `bun test` from root ignores `packages/mobile`. |
| Hooks | **Lefthook** | Staged ESLint + type-check + Jest. |
| Logging | **LogTape** via `@thymeapp/logging` | `configureAppLogging` + `getLogger`. Console now; extra sinks later. |
| License | **AGPL-3.0-only** | Self-hosted network app. |

## Commands

Same names in every package: `start`, `lint`, `lint:fix`, `type-check`, `precheck`. Runnables also have `smoke`.

From the repo root:

```bash
bun start          # Compose: postgres + server (bun --hot) + web (Vite)
bun urls           # host ports Docker assigned
bun start:mobile   # host Expo / Metro
bun db             # postgres up --wait
bun precheck       # type-check + lint
bun test           # core + web
cd packages/mobile && bun run test   # jest-expo
```

Root `start` is Docker Compose. It is not `expo run:ios`. Mobile is still host-only. Full story: [`LOCAL-DB.md`](./LOCAL-DB.md).

## How to run mobile

Host only. App Store Expo Go is too old for SDK 57; this app uses a **development build** (`expo-dev-client`). Same two commands as Expo’s own docs:

```bash
cd packages/mobile
bun run ios              # first time / native changes: compile, install, Metro
bun start                # JS only; `i` opens the app already on the Simulator
bun run ios -- --device  # same, plugged-in iPhone
```

`i` never compiles. If you see “No development build is installed,” run `bun run ios` (or `-- --device`) once.

Xcode is optional: Product → Run is Debug (Metro); Product → Profile is Release (no Metro). Team `R5DTQ834DF` is Personal Team (7-day). `ios.buildReactNativeFromSource` is on so `expo run:ios` can link `expo-dev-launcher` against RN 0.86’s prebuilt Core (Xcode GUI often succeeds without that; CLI `xcodebuild` does not).

Do not edit files under `ios/` by hand. Change `app.json` / config plugins and re-run `bunx expo prebuild --clean`.

### EAS (cloud)

The project is already linked (`extra.eas.projectId` in `packages/mobile/app.json`). From that package:

```bash
bunx eas-cli login
bunx eas-cli whoami
bunx eas-cli build --profile development --platform ios
```

`eas.json` has `development` (dev client, internal), `development-simulator`, `preview` (internal, store-like), and `production`. iOS cloud builds that install on a physical device require the paid Apple program. Android preview APKs do not.

### Public repo vs signing data

`appleTeamId`, `bundleIdentifier`, `owner`, and the EAS `projectId` are **identifiers, not secrets**. They already show up in App Store listings, provisioning profiles, and Expo URLs. Fine in a public `app.json`.

Do **not** commit: `.p8`, `.p12`, `.mobileprovision`, `.jks`, `.key`, `EXPO_TOKEN`, App Store Connect API keys. Those are already gitignored. EAS stores certs on Expo's side after you log in.

### Lingui

```bash
cd packages/mobile
bun run i18n:extract    # rewrite src/locales from <Trans> / t`...` macros
bun run i18n:check      # extract + fail if catalogs are stale (also in precheck)
```

Source locale is `en`. `pseudo-en` is a padded/accented QA locale (toggle on the home screen). Metro compiles `.po` files via `@lingui/metro-transformer`; do not commit compiled `messages.js`. After changing `lingui.config.ts`, restart Metro with `-c`.

## Layout

```
packages/mobile      Expo app (host; not in Compose)
packages/web         Vite admin + history (scaffold; Compose bind-mount)
packages/server      Elysia stub (Compose bind-mount)
packages/logging     LogTape configure helper. No `@thymeapp/*` imports.
packages/core        Shared domain (no platform imports)
packages/components  Shared UI
packages/types       Shared types
docker-compose.yaml             Local postgres + server + web (Compose finds this by name)
docker-compose.example.yml      Self-host copy-paste (Postgres + one app image)
Dockerfile               Release: API + web UI
docs/LOCAL-DB.md         Compose / Postgres / later Joist
docs/references      Swarm / Lifecycle recaps
```

Shared `tsconfig.json` and ESLint style live at the repo root. Packages only add Hermes (`ES2022` + `react-native` conditions), DOM (web), or `types: ["bun"]` (server). React hook rules apply to mobile/web only.

### Logging

`@thymeapp/logging` is a leaf: ESLint forbids it from importing other `@thymeapp/*` packages. Apps call `configureAppLogging` once, then `getLogger(['thymeapp', 'server' | 'web' | 'mobile'])`. Extra sinks (file, HTTP) go in `configureAppLogging({ sinks })`.

- **Mobile:** `__DEV__` → debug. Metro / Xcode console.
- **Web:** `import.meta.env.DEV` → debug. Devtools console.
- **Server:** `LOG_LEVEL`; JSON when `NODE_ENV=production` or `LOG_FORMAT=json`. ANSI pretty otherwise.
- **Mobile:** ANSI in Metro (not Chrome `%c` — RN prints CSS as text).

Do not put location, check-ins, or other per-user RLS data in log fields.

## Decisions that are *not* needed yet

- How the server owner is blocked from reading location (RLS vs encryption)
- Sync protocol
- Federation
- A full offline-first engine
- Paid Apple Developer Program / TestFlight / Play Store submission
- Disk / remote log transports and backend log ingest
