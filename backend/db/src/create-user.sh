#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    BEGIN;
        create user $DB_USER with password '$DB_PASSWORD';
        grant connect on database app to app_user ;
        grant insert,select,update,delete on all tables in schema public to app_user ;
        grant select,update on all sequences in schema public to app_user ;
    COMMIT;
EOSQL