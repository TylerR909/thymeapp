# ThymeApp

Self-hosted location tracking: [Foursquare Swarm](docs/references/swarm.md)–style check-ins plus [Life Cycle](docs/references/lifecycle.md)–style recaps. See [docs/references](docs/references/README.md) and [docs/TOOLING.md](docs/TOOLING.md).

Licensed under the [GNU Affero General Public License v3.0](LICENSE).

## Requirements

- **Bun** `1.3.14` (see `.bun-version`). Upgrade with `bun upgrade`.
- **Node.js** 22.13+ (24 recommended; see `.node-version`)

## Layout

- **`packages/mobile/`** — Expo SDK 57 app
- **`packages/web/`** — Vite admin + history browser (scaffold)
- **`packages/server/`** — Bun + Elysia stub (Postgres 17 Compose file when needed)
- **`packages/core/`**, **`packages/components/`**, **`packages/types/`** — shared code

## Quick start (host)

Run this on the Mac, not inside the Dev Container. The inner loop that works is host Bun + Simulator or a matching Expo Go.

```bash
bun install

cd packages/mobile
bun start          # Metro only — then press `i` for iOS Simulator
```

Other packages, same name:

```bash
cd packages/web && bun start
cd packages/server && bun start
```

From the repo root, `bun start` boots all three. `bun precheck` is type-check + lint. `bun test` is Bun’s runner (core + web). Mobile stays on Jest (`cd packages/mobile && bun run test`) because React Native is not bun-testable.

## Mobile: Simulator vs phone

`bun start` starts Metro. It does not install an app by itself.

- **iOS Simulator (recommended right now):** press `i` in the Expo TUI. Expo CLI can install the **SDK 57** Simulator Expo Go. You do not need a LAN IP.
- **Physical iPhone:** App Store Expo Go stops at **SDK 54**. This project is **57**, so the purple App Store app will refuse it. Use [expo.dev/go](https://expo.dev/go) / [sign.expo.dev](https://sign.expo.dev/) or `eas go` (TestFlight). Copy `.env.example` → `.env.local` and set `REACT_NATIVE_PACKAGER_HOSTNAME` to the Mac’s LAN IP (Expo 57+ will not load that value from `.env`).

A development build (`expo-dev-client`) is the next step when Expo Go is too far behind or you need background location.

## Dev Container

Optional Linux box. It cannot launch Simulator.app. Prefer host `bun start` for mobile.
