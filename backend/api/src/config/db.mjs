import pg from "pg";
const { Client } = pg;
const db_options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST, //host
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const connect = async () => {
  const client = new Client(db_options);
  await client.connect();
  console.log("conectando a la db");
  return client;
};

export { connect };
