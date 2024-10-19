
import pg from "pg";
const { Client } = pg;
const db_options = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST, //host
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// console.log(client);


const getUsers = async () => {
    try {
        const client = new Client(db_options);
        await client.connect();
        console.log('conectando a la db');
        const resultados = await client.query('select * from usuarios');
        console.log(resultados.rows);
        await client.end();   
        return resultados.rows;
    } catch (error) {
        console.log('error al listar usuarios', error)
    }
};

const createUser = async (nombre, telefono)=>{
    try {
        const client = new Client(db_options);
        await client.connect();
        console.log('conectando a la db');
        await client.query(`insert into usuarios (nombre, telefono) values ('${nombre}', '${telefono}');`);
        await client.end();   
    } catch (error) {
        console.log('error al crear usuario', error)
    }
}
const updateUser = async (id, nombre)=>{
    try {
        const client = new Client(db_options);
        await client.connect();
        console.log('conectando a la db');
        await client.query(`update usuarios set nombre='${nombre}' where id = ${id};`);
        await client.end();   
    } catch (error) {
        console.log('error al actualizar usuario', error)
    }
}
const deleteUser = async (id)=>{
    try {
        const client = new Client(db_options);
        await client.connect();
        console.log('conectando a la db');
        await client.query(`delete from usuarios where id = ${id};`);
        await client.end();   
    } catch (error) {
        console.log('error al eliminar usuario', error)
    }
}

export {createUser, getUsers, updateUser, deleteUser};
