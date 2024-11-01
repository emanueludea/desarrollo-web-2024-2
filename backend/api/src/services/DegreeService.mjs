// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Degree } from "../models/Degree.mjs";

class DegreeService {
  getAll = async () => {
    try {
      console.log("getAll en CarreraService");
      const results = await new Db().query("SELECT * FROM degree");
      return results.rows.map(
        ({ id, name, faculty_id }) => new Degree(id, name)
      );
    } catch (error) {
      console.log("error al listar carreras", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createDegree = async (degreeName, facultyId) => {
    try {
      const newDegree = await new Db().query(
        `INSERT INTO degree (name, faculty_id) VALUES ($1,$2) RETURNING *`,
        [degreeName, facultyId]
      );
      if (!newDegree.rowCount) return null;
      const { id, name, faculty_id } = newDegree.rows[0];
      return new Degree(id, name);
    } catch (error) {
      console.log("error al crear carreras", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateDegree = async (degreeId, degreeName) => {
    try {
      const updated = await new Db().query(
        `UPDATE degree SET name=$1 WHERE id = $2 RETURNING id,name;`,
        [degreeName, degreeId]
      );
      if (!updated.rowCount) return null;
      const { id, name, faculty_id } = updated.rows[0];
      return new Degree(id, name);
    } catch (error) {
      console.log("error al actualizar carreras", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteDegree = async (id) => {
    try {
      await new Db().query(`DELETE FROM degree WHERE id = $1`, [id]);
    } catch (error) {
      console.log("error al eliminar carreras", error);
      throw new CustomError(error.code, error.detail);
    }
  };
  getOne = async (degreeId) => {
    try {
      console.log("getAll en CarreraService");
      const results = await new Db().query(
        "SELECT * FROM degree WHERE id = $1",
        [degreeId]
      );
      const { id, name } = results.rows[0];
      return new Degree(id, name);
    } catch (error) {
      console.log("error al listar carreras", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { DegreeService };
