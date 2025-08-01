# Development Tooling

## Package Management - Bun (NOT npm/yarn)
```bash
bun install                    # Install dependencies
bun add <package>             # Add dependency
bun run <script>              # Run script
cd packages/mobile && bun run start  # Start mobile app
```

## Code Quality
- **TypeScript**: Strict checking, workspace path aliases
- **ESLint**: React Native community config + custom rules
- **Prettier**: Auto-formatting with organize imports
- **Husky**: Pre-commit hooks for linting/type checking

## Mobile Development (Expo)
```bash
cd packages/mobile
bun run start                # Expo dev server
bun run android/ios         # Platform-specific
```

## Database (Drizzle)
```bash
bun run db:generate         # Generate migrations
bun run db:migrate          # Run migrations
bun run db:studio           # Open Drizzle Studio
```
