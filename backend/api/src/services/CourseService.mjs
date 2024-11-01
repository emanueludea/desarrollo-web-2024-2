// Llamados a la DB
import { Db } from "../config/db.mjs";
import { Course } from "../models/Course.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class CourseService {
  getAll = async () => {
    try {
      console.log("getAll en CursosService");
      const resultados = await new Db().query("SELECT * FROM course");
      return resultados.rows.map(
        ({ name, code, credits }) => new Course(name, code, credits)
      );
    } catch (error) {
      console.log("error al listar cursos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  createCourse = async (courseCode, courseName, courseCredits) => {
    try {
      const newCourse = await new Db().query(
        `INSERT INTO course (code, name, credits) VALUES ($1, $2, $3) RETURNING *`,
        [courseCode, courseName, courseCredits]
      );
      if (!newCourse.rowCount) throw new CustomError();
      const { code, name, credits } = newCourse.rows[0];
      return new Course(code, name, credits);
    } catch (error) {
      console.log("error al crear cursos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  updateCourse = async (courseCode, courseName, courseCredits) => {
    try {
      const updated = await new Db().query(
        `UPDATE course SET name=$1, credits=$2 WHERE code = $3 RETURNING code,name,credits;`,
        [courseName, courseCredits, courseCode]
      );
      if (!updated.rowCount) return null;
      const { code, name, credits } = updated.rows[0];
      return new Course(code, name, credits);
    } catch (error) {
      console.log("error al actualizar cursos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  deleteCourse = async (code) => {
    try {
      const result = await new Db().query(
        `delete FROM cursos WHERE codigo = $1 RETURNING code;`,
        [codigo]
      );
      if (!result.rowCount) return null;
      return result.rows[0];
    } catch (error) {
      console.log("error al eliminar cursos", error);
      throw new CustomError(err.code, err.detail);
    }
  };

  getOne = async (courseCode) => {
    try {
      const results = await new Db().query(
        "SELECT * FROM course WHERE code = $1",
        [courseCode]
      );
      const { code, name, credits } = results.rows[0];
      // console.log(results.rows);
      return new Course(code, name, credits);
    } catch (error) {
      console.log("error al listar cursos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getAllByStudent = async (dni) => {
    const client = new Db();
    try {
      console.log("getCouses en AlumnoService");
      const results = await client.query(
        "SELECT * FROM course WHERE code IN (SELECT course_code FROM enrollment WHERE student_dni = $1)",
        [dni]
      );
      return results.rows.map(
        ({ code, name, semester }) => new Course(code, name, semester)
      );
    } catch (error) {
      console.log("error al listar alumnos", error);
      throw new CustomError(error.code, error.detail);
    }
  };

  getOneByStudent = async (dni, courseCode) => {
    const client = new Db();
    try {
      console.log("getCouses en AlumnoService");
      const results = await client.query(
        `SELECT * 
        FROM course 
        WHERE code IN 
          (SELECT course_code FROM enrollment WHERE student_dni = $1)
        AND code = $2`,
        [dni, courseCode]
      );
      if (!results.rowCount) return null;
      const { code, name, semester } = results.rows;
      return new Course(code, name, semester);
    } catch (error) {
      console.log("error al listar alumnos", error);
      throw new CustomError(error.code, error.detail);
    }
  };
}

export { CourseService };
