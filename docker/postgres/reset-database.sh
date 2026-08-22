#!/usr/bin/env bash
# Drop and recreate thymeapp + thymeapp_tests_* (bun redb).
set -euo pipefail

parallelism="${TEST_PARALLELISM:-1}"
pids=()

databases=('thymeapp')
for ((i = 1; i < parallelism + 1; i++)); do
  databases+=("thymeapp_tests_${i}")
done

for db in "${databases[@]}"; do
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
    -c "DROP DATABASE IF EXISTS ${db} WITH (FORCE);"
  /init-database.sh "$db" &
  pids+=("$!")
done

status=0
for pid in "${pids[@]:-}"; do
  if ! wait "$pid"; then
    status=1
  fi
done
exit "$status"
