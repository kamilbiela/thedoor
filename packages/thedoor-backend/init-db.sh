cat ./schema.sql | docker-compose exec -T timescale psql -U postgres -h localhost
