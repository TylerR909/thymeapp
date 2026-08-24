FROM postgres:18

COPY docker/postgres/create-database.sh /docker-entrypoint-initdb.d/001_create-database.sh
COPY docker/postgres/init-database.sh /init-database.sh
COPY docker/postgres/reset-database.sh /reset-database.sh
RUN chmod +x /docker-entrypoint-initdb.d/001_create-database.sh /init-database.sh /reset-database.sh

# Local-only: skip fsync so redb / crash-restart is fast. Self-host uses stock postgres:18.
CMD ["postgres", "-c", "fsync=off"]
