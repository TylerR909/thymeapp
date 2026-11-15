# Dependency locks

Why we are not on the next major. What we run is [`TOOLING.md`](./TOOLING.md). Delete a row when the blocker dies, then bump.

React, React Native, and Expo modules: `bunx expo install` / `--fix` only.

| Stay on | Want | Blocker | Unlocks when |
| --- | --- | --- | --- |
| TypeScript **6.0.x** | 7.1 | `typescript-eslint` peer is `<6.1.0`. 7.0 is out; we wait for **7.1** plus typed-ESLint. | `typescript-eslint` allows `>=7.1`. |
| `@eslint/compat` around `eslint-plugin-react` and `eslint-plugin-react-native` | drop the shim | Those plugins still call removed ESLint 9 `context` methods (`getFilename`, `getSourceCode`). | The plugins stop using the old API. |
| Elysia **1.4** | 2 | 2 is still `rc` / experimental (`2.0.0-rc.4`). | Elysia 2 stable. |
| Drizzle **0.45** | 1.0 | 1.0 is still rc/beta. | Drizzle 1.0 stable. |
