# Recipes only. `docker compose` finds docker-compose.yaml + .env by name.
# New worktrees get `.env` from Conductor via `.worktreeinclude`.

-include .env
COMPOSE := docker compose
PSQL := $(COMPOSE) exec postgres psql --username $(DB_USER)

hostport = $(shell $(COMPOSE) port $(1) $(2) | cut -d: -f2)

.PHONY: start db redb psql urls

start:
	$(COMPOSE) up postgres server web

db:
	$(COMPOSE) up --wait postgres

redb:
	$(COMPOSE) up --wait postgres
	$(COMPOSE) exec postgres /reset-database.sh

psql:
	$(PSQL) --dbname $(DB_DATABASE)

urls:
	@echo "web:      http://localhost:$(call hostport,web,5173)"
	@echo "server:   http://localhost:$(call hostport,server,3000)"
	@echo "inspect:  localhost:$(call hostport,server,9229)"
	@echo "postgres: localhost:$(call hostport,postgres,5432)"
