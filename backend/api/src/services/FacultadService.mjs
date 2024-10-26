// Llamados a la DB
import { connect } from "../config/db.mjs";
import { Facultad } from "../models/Facultad.mjs";

class FacultadService {
  constructor(){
  }
  getAll = async () => {
    try {
      console.log('getAll en FacultadService');
      const client = await connect();
      const resultados = await client.query("select * from facultades");
      await client.end();
      const facultades = [];
      resultados.rows.forEach((element) => {
        const { id, nombre } = element;
        facultades.push(new Facultad(id, nombre));
      });
      return facultades;
    } catch (error) {
      console.log("error al listar facultades", error);
    }
  };

  crearFacultad = async (nombre, telefono) => {
    try {
      const client = connect();
      await client.query(`insert into facultades (nombre) values ('${nombre}'`);
      await client.end();
      // logica adicional
    } catch (error) {
      console.log("error al crear facultades", error);
    }
  };
  actualizarFacultad = async (id, nombre) => {
    try {
      const client = await connect();
      await client.query(
        `update facultades set nombre='${nombre}' where id = ${id};`
      );
      await client.end();
    } catch (error) {
      console.log("error al actualizar facultades", error);
    }
  };
  borrarFacultad = async (id) => {
    try {
      const client = connect();
      await client.query(`delete from facultades where id = ${id};`);
      await client.end();
    } catch (error) {
      console.log("error al eliminar facultades", error);
    }
  };
}

export { FacultadService };
