#!/usr/bin/env bash
# Create one database and grant it to the app role. Called from create/reset.
set -euo pipefail

db="${1:?database name required}"
user="${APP_DB_USER:-thymeapp}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<-EOSQL
  CREATE DATABASE ${db} OWNER ${user};
  GRANT ALL PRIVILEGES ON DATABASE ${db} TO ${user};
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$db" <<-EOSQL
  GRANT ALL ON SCHEMA public TO ${user};
  CREATE EXTENSION IF NOT EXISTS citext;
EOSQL
