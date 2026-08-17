# Agent notes

Read [`docs/TOOLING.md`](docs/TOOLING.md) for what runs today. [`docs/ROADMAP.md`](docs/ROADMAP.md) is a **non-binding** future stack (Joist, PowerSync, Eden, etc.) — do not install those unless the task says to. Bun workspaces, not npm/yarn.

Product language:

- **Swarm** / **Foursquare Swarm** → [`docs/references/swarm.md`](docs/references/swarm.md)
- **Lifecycle** / **Life Cycle** / **LifeCycle** → [`docs/references/lifecycle.md`](docs/references/lifecycle.md)
- How this repo combines them → [`docs/references/README.md`](docs/references/README.md)

If a task mentions Swarm, Lifecycle, check-ins, recaps, slices, stickers, mayorships, or “open after months and it still knows,” read those files first.

Mobile inner loop is **host** `cd packages/mobile && bun start`, then `i` for Simulator. App Store Expo Go is SDK 54; this app is SDK 57. Do not introduce a dev client unless the task needs something Expo Go cannot do (background location, custom native code).
