docker compose exec backend npx knex migrate:rollback --all --knexfile knexfile.cjs
docker compose exec backend npx knex migrate:latest --knexfile knexfile.cjs
