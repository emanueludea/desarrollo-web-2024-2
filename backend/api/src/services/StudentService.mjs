// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Course } from "../models/Course.mjs";
import { Student } from "../models/Student.mjs";
import { CustomError } from "../utils/CustomError.mjs";

const retuninString = `
          dni,
          names,
          lastname,
          date_of_birth, 
          extract(year FROM age(current_date, date_of_birth))`;
class StudentService {
  getAll = async () => {
    const client = new Db();
    try {
      console.log("getAll at StudentService");
      const results = await client.query(
        `SELECT ${retuninString}
        FROM student;`
      );
      return results.rows.map(
        ({ dni, names, lastname, date_of_birth }) =>
          new Student(dni, names, lastname, date_of_birth)
      );
    } catch (error) {
      console.log("error al listar alumnos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createStudent = async (stdDni, stdNames, stdLastname, stdDateOfBirth) => {
    try {
      const client = new Db();
      const result = await client.query(
        `INSERT INTO student (dni, names, lastname, date_of_birth) 
        VALUES ($1, $2, $3, $4) RETURNING ${retuninString}`,
        [stdDni, stdNames, stdLastname, stdDateOfBirth]
      );
      if (!result.rowCount) throw new CustomError();
      const { dni, names, lastname, date_of_birth } = result.rows[0];
      return new Student(dni, names, lastname, date_of_birth);
    } catch (error) {
      console.log("error al crear alumno", error);
      throw new CustomError(error.code, error.detail);
    }
  };
  updateStudent = async (stdDni, stdNames, stdLastname, stdDateOfBirth) => {
    try {
      const client = new Db();
      const result = await client.query(
        `UPDATE student SET 
            names = $1, 
            lastname = $2, 
            date_of_birth = $3 
          WHERE dni = $4 
          RETURNING ${retuninString};`,
        [stdNames, stdLastname, stdDateOfBirth, stdDni]
      );
      if (!result.rowCount) return null;
      const { dni, names, lastname, date_of_birth } = result.rows[0];
      return new Student(dni, names, lastname, date_of_birth);
    } catch (error) {
      console.log("error al actualizar alumno", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteStudent = async (dni) => {
    try {
      await new Db().query(`delete FROM student WHERE dni = $1`, [dni]);
    } catch (error) {
      console.log("error al eliminar alumno", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getOne = async (studentDni) => {
    try {
      console.log("getOne service");
      const client = new Db();
      const results = await client.query(
        "SELECT * FROM student WHERE dni = $1",
        [studentDni]
      );
      if (!results.rowCount) return null;
      console.log(results);
      const { dni, names, lastname, date_of_birth } = results.rows[0];
      return new Student(dni, names, lastname, date_of_birth);
    } catch (error) {
      console.log(error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { StudentService };
