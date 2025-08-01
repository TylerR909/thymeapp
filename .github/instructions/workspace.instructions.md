# Workspace Architecture

## Monorepo Overview
**ThymeApp** - Self-hosted location tracking app (like Swarm/Foursquare)
**Package Manager**: Bun (NOT npm/yarn)

## Package Structure

### `packages/core/`
- **Purpose**: Shared business logic and utilities
- **Dependencies**: Minimal, no platform-specific code
- **Used by**: All other packages

### `packages/mobile/`
- **Purpose**: React Native/Expo mobile app
- **Framework**: React Native + Expo managed workflow
- **Database**: SQLite + Drizzle ORM
- **Features**: Primary user interface, check-ins, social features

### `packages/server/`
- **Purpose**: Backend API server
- **Runtime**: Bun, Docker Compose, PostgreSQL
- **Database**: PostgreSQL + Drizzle (shared schema with mobile)
- **Features**: Authentication, API endpoints, federated social

### `packages/types/`
- **Purpose**: Shared TypeScript definitions
- **Dependencies**: None (pure types)
- **Used by**: All packages for type safety

### `packages/web/` (Planned)
- **Purpose**: Web application (future)
- **Runtime**: Bun/React.js
- **Dependencies**: Will use core and types packages

## Dependency Flow
```
types ← core ← mobile
  ↑      ↑       
  └─── server   
```
