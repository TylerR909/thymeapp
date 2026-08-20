# Release artifact: API + built web UI in one image.
# Local `bun start` does not use this — Compose bind-mounts oven/bun instead.
FROM oven/bun:1.3.14-debian AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
COPY packages/web/package.json packages/web/
COPY packages/server/package.json packages/server/
COPY packages/core/package.json packages/core/
COPY packages/logging/package.json packages/logging/
COPY packages/types/package.json packages/types/
COPY packages/components/package.json packages/components/
RUN bun install --frozen-lockfile
COPY packages/web packages/web
COPY packages/server packages/server
COPY packages/core packages/core
COPY packages/logging packages/logging
COPY packages/types packages/types
COPY packages/components packages/components
RUN bun --filter @thymeapp/web build

FROM oven/bun:1.3.14-debian
WORKDIR /app
ENV NODE_ENV=production WEB_ROOT=/app/web
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/bun.lock /app/bunfig.toml ./
COPY --from=build /app/packages/server packages/server
COPY --from=build /app/packages/logging packages/logging
COPY --from=build /app/packages/types packages/types
COPY --from=build /app/packages/web/dist ./web
EXPOSE 3000
CMD ["bun", "packages/server/src/index.ts"]
