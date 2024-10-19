#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    create database app;
    \c app
    create table usuarios (id serial, nombre varchar(50), telefono varchar(10));
    insert into usuarios (nombre, telefono) values ('emanuel', '3214566545'), ('carlos', '3246546545');
EOSQL