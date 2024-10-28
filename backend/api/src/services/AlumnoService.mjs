// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Alumno } from "../models/Alumno.mjs";

class AlumnoService {
  getAll = async () => {
    try {
      console.log("getAll en AlumnoService");
      // const client = await connect();
      // const resultados = await client.query("select * from facultades");
      // const resultados = await this.#dbClient.query("select * from facultades");
      // await client.end();
      const resultados = await new Db().selectQuery("select * from alumnos");
      return resultados.rows.map((element) => Alumno.fromObject(element));
    } catch (error) {
      console.log("error al listar alumnos", error);
    }
  };

  crearAlumno = async (cedula, nombres, apellidos, fechaNacimiento) => {
    try {
      //logica adicional
      // const client = connect();
      // const nuevo = await client.query(`insert into facultades (nombre) values ('${nombre}'`);
      // await client.end();
      const nuevo = await new Db().selectQuery(
        `insert into alumnos (cedula, nombres, apellidos, fecha_nacimiento) 
        values ('${cedula}', '${nombres}', '${apellidos}', ${fechaNacimiento}) returning *`
      );
      // console.log(nuevo);
      // logica adicional
      if (nuevo.rows.length > 0) {
        return Alumno.fromObject(nuevo.rows[0]);
      }
      return null;
    } catch (error) {
      console.log("error al crear alumno", error);
      return null;
    }
  };
  actualizarFacultad = async (cedula, nombres, apellidos, fechaNacimiento) => {
    try {
      const actualizada = await new Db().selectQuery(
        `update alumnos set cedula = '${cedula}', 
          nombres = '${nombres}', 
          apellidos = '${apellidos}', 
          fecha_nacimiento = '${fechaNacimiento}')  where cedula = ${cedula} 
          returning cedula, nombres, apellidos, fecha_nacimiento;`
      );
      // const client = await connect();
      // const actualizada = await client.query(
      //   `update facultades set nombre='${nombre}' where id = ${id};`
      // );
      // await client.end();
      if (actualizada.rows.length > 0)
        return Alumno.fromObject(actualizada.rows[0]);
      return null;
    } catch (error) {
      console.log("error al actualizar alumno", error);
    }
  };
  borrarFacultad = async (cedula) => {
    try {
      // const client = connect();
      // await client.query(`delete from facultades where id = ${id};`);
      // await client.end();
      new Db().selectQuery(
        `delete from facultades where cedula = ${cedula} returning *;`
      );
    } catch (error) {
      console.log("error al eliminar alumno", error);
    }
  };
}

export { AlumnoService };
