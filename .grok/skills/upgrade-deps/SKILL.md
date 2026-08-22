---
name: upgrade-deps
description: >
  Check or bump thymeapp dependency versions against docs/DEPENDENCIES.md.
  Use when the user says upgrade, bump, latest, dep version, lockfile, Jest 30,
  TypeScript 7, ESLint, Expo SDK, React Native, Elysia 2, Drizzle 1, or
  /upgrade-deps.
---

# Upgrade deps

1. Read [`docs/DEPENDENCIES.md`](../../../docs/DEPENDENCIES.md) first. That table is why those packages are not on npm `latest`.
2. For each proposed bump, match it to a row:
   - Still blocked → do not bump; say the unlock condition.
   - Unlock condition is now true → bump, then delete that row and fix the TOOLING.md stack table if the choice changed.
3. React, React Native, and Expo modules: `bunx expo install` / `--fix` only.
4. Jest is one version for mobile, web, and server.
5. After any bump: `bun run type-check && bun run lint && bun run test`.
