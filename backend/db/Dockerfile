FROM postgres:17
WORKDIR /docker-entrypoint-initdb.d
COPY create-db.sql 10-create-db.sql
COPY create-user.sh 20-create-user.sh