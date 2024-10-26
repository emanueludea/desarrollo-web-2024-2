FROM postgres:17
WORKDIR /docker-entrypoint-initdb.d
COPY src/create-db.sql 10-create-db.sql
COPY src/create-user.sh 20-create-user.sh