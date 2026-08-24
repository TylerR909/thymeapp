#!/usr/bin/env bash
# Runs once on an empty data dir (docker-entrypoint-initdb.d).
set -euo pipefail

user="${APP_DB_USER:-thymeapp}"
pass="${APP_DB_PASSWORD:-thymeapp}"
parallelism="${TEST_PARALLELISM:-1}"

databases=('thymeapp')
for ((i = 1; i < parallelism + 1; i++)); do
  databases+=("thymeapp_tests_${i}")
done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<-EOSQL
  DO \$\$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${user}') THEN
      CREATE ROLE ${user} LOGIN PASSWORD '${pass}';
    END IF;
  END
  \$\$;
EOSQL

for db in "${databases[@]}"; do
  /init-database.sh "$db"
done
