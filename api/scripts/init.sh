#!/bin/bash

set -e

echo "Creating database..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    SELECT 'CREATE DATABASE '"$POSTGRES_DB"
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = ''"$POSTGRES_DB"')\gexec
EOSQL

echo "Database created successfully"