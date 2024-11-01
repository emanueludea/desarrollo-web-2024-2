// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Professor } from "../models/Professor.mjs";

class ProfessorService {
  getAll = async () => {
    try {
      console.log("getAll en ProfessorService");
      const results = await new Db().query("SELECT * FROM professor");
      return results.rows.map(
        ({ dni, name, lastname }) => new Professor(dni, name, lastname)
      );
    } catch (error) {
      console.log("error al listar profesores", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createProfessor = async (professorDni, professorName, professorLastname) => {
    try {
      const newProfessor = await new Db().query(
        `INSERT INTO professor (dni,name,lastname) VALUES ($1, $2, $3) RETURNING *`,
        [professorDni, professorName, professorLastname]
      );
      if (!newProfessor.rowCount) return null;
      const { dni, name, lastname } = newProfessor.rows[0];
      return new Professor(dni, name, lastname);
    } catch (error) {
      console.log("error al crear profesores", error);
      throw new CustomError(error.code, error.detail);
    }
  };
  updateProfessor = async (professorDni, professorName, professorLastname) => {
    try {
      const updated = await new Db().query(
        `UPDATE professor SET name=$1, lastname=$2 WHERE dni = $3 RETURNING dni,name,lastname;`,
        [professorName, professorLastname, professorDni]
      );
      if (!updated.rowCount) return null;
      const { dni, name, lastname } = updated.rows[0];
      return new Professor(dni, name, lastname);
    } catch (error) {
      console.log("error al actualizar profesores", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteProfessor = async (id) => {
    try {
      await new Db().query(
        `DELETE FROM professor WHERE id = $1 RETURNING dni,name;`,
        [id]
      );
    } catch (error) {
      console.log("error al eliminar profesores", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getOne = async (professorDni) => {
    try {
      console.log("getOne service");
      const client = new Db();
      const results = await client.query(
        "SELECT * FROM professor WHERE dni = $1",
        [professorDni]
      );
      if (results.rowCount === 0) return null;
      console.log(results);
      const { dni, names, lastname } = results.rows[0];
      return new Professor(dni, names, lastname);
    } catch (error) {
      console.log(error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { ProfessorService };
