// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Facultad } from "../models/Facultad.mjs";

class FacultadService {
  getAll = async () => {
    try {
      console.log("getAll en FacultadService");
      // const client = await connect();
      // const resultados = await client.query("select * from facultades");
      // const resultados = await this.#dbClient.query("select * from facultades");
      // await client.end();
      const resultados = await new Db().selectQuery("select * from facultades");
      return resultados.rows.map((element) => Facultad.fromObject(element));
    } catch (error) {
      console.log("error al listar facultades", error);
    }
  };

  crearFacultad = async (nombre) => {
    try {
      //logica adicional
      // const client = connect();
      // const nuevo = await client.query(`insert into facultades (nombre) values ('${nombre}'`);
      // await client.end();
      const nuevo = await new Db().selectQuery(
        `insert into facultades (nombre) values ('${nombre}') returning *`
      );
      // console.log(nuevo);
      // logica adicional
      if (nuevo.rows.length > 0) {
        return Facultad.fromObject(nuevo.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear facultades", error);
    }
  };
  actualizarFacultad = async (id, nombre) => {
    try {
      const actualizada = await new Db().selectQuery(
        `update facultades set nombre='${nombre}' where id = ${id} returning id,nombre;`
      );
      // const client = await connect();
      // const actualizada = await client.query(
      //   `update facultades set nombre='${nombre}' where id = ${id};`
      // );
      // await client.end();
      if (actualizada.rows.length > 0)
        return Facultad.fromObject(actualizada.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar facultades", error);
    }
  };
  borrarFacultad = async (id) => {
    try {
      // const client = connect();
      // await client.query(`delete from facultades where id = ${id};`);
      // await client.end();
      new Db().selectQuery(`delete from facultades where id = ${id} returning id,nombre;`);
    } catch (error) {
      console.log("error al eliminar facultades", error);
    }
  };
}

export { FacultadService };
