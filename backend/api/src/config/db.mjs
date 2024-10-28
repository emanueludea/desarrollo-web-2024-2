import pg from "pg";
const { Client } = pg;

class Db {
  #client;
  constructor() {
    const db_options = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST, //host
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
    this.#client = new Client(db_options);
  }
  selectQuery = async (query)=>{
    await this.#client.connect();
    console.log(query);
    const resultados = await this.#client.query(query);
    await this.#client.end();
    return resultados;
  }
}
// const db_options = {
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST, //host
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// };

// const connect = async () => {
//   const client = new Client(db_options);
//   await client.connect();
//   console.log("conectando a la db");
//   return client;
// };

export { Db };
