# Dependency locks

Why we are not on the next major. What we run is [`TOOLING.md`](./TOOLING.md). Delete a row when the blocker dies, then bump.

React, React Native, and Expo modules: `bunx expo install` / `--fix` only.

| Stay on | Want | Blocker | Unlocks when |
| --- | --- | --- | --- |
| TypeScript **6.0.x** | 7.1 | `typescript-eslint` peer is `<6.1.0`. 7.0 is out; we wait for **7.1** plus typed-ESLint. | `typescript-eslint` allows `>=7.1`. |
| Jest **29** (mobile, web, server, shared) | 30 | `jest-expo` 57 is built on Jest 29. | `jest-expo` targets Jest 30. Bump every Jest project together. |
| React **19.2.3** / RN **0.86.2** | SDK’s next pin | Expo SDK **57**. npm `latest` RN is already 0.87. | Next Expo SDK. |
| `@eslint/compat` around `eslint-plugin-react` and `eslint-plugin-react-native` | drop the shim | Those plugins still call removed ESLint 9 `context` methods (`getFilename`, `getSourceCode`). | The plugins stop using the old API. |
| `@testing-library/react-native` **13** | 14 | 14: `renderHook().result.current` is `undefined` on this Jest 29 / RN 0.86 setup. | Confirmed working here, or we move with Expo/RN. |
| Elysia **1.4** | 2 | 2 is `next` / experimental. | Elysia 2 stable. |
| Drizzle **0.45** | 1.0 | 1.0 is still rc/beta. | Drizzle 1.0 stable. |
