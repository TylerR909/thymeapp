# ThymeApp

A cross-platform time tracking application built with React Native and Expo.

## Monorepo Structure

This is a Bun workspace monorepo with the following packages:

- **`packages/core/`** - Shared business logic and utilities
- **`packages/mobile/`** - React Native/Expo mobile application
- **`packages/server/`** - Backend API server
- **`packages/types/`** - Shared TypeScript type definitions
- **`packages/web/`** - Web application (planned)

## Quick Start

To install dependencies:

```bash
bun install
```

To run the mobile app:

```bash
cd packages/mobile
bun run start
```

To run the server:

```bash
cd packages/server
bun run start
```

## Development

This project uses:

- **Bun** as the package manager and runtime
- **React Native** with Expo for mobile development
- **SQLite** with Drizzle ORM for data persistence
- **TypeScript** for type safety
- **ESLint** and Prettier for code formatting

## Available Scripts

```bash
bun run lint          # Lint all packages
bun run lint:fix      # Fix linting issues
bun run type-check    # TypeScript type checking
```

---

This project was created using `bun init` in bun v1.2.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
