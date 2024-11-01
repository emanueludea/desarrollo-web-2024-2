// Manipulo el request/response
import { validationResult, matchedData } from "express-validator";

import { CourseService } from "../services/CourseService.mjs";
import { StudentService } from "../services/StudentService.mjs";
import { EnrollmentService } from "../services/EnrollmentService.mjs";

// llamo a los servicios
class StudentController {
  #studentservice;
  #courseService;
  #enrollmenService;
  constructor() {
    this.#studentservice = new StudentService();
    this.#courseService = new CourseService();
    this.#enrollmenService = new EnrollmentService();
  }
  getAll = async (req, res) => {
    const lista = await this.#studentservice.getAll();
    res.send(lista);
  };

  createStudent = async (req, res) => {
    const validated = validationResult(req);
    if (!validated.isEmpty())
      return res.status(400).send({ errors: validated.array() });
    const { dni, names, lastname, dateOfBith } = matchedData(req);
    // const { dni, names, lastname, dateOfBith } = req.body;
    // if (!dni || !names || !lastname) {
    //   return res.status(400).send({ code: 400, message: "some data missing" });
    // }
    try {
      const newStudent = await this.#studentservice.createStudent(
        dni,
        names,
        lastname,
        dateOfBith ?? null
      );
      console.log(newStudent, "newStudent");
      res.set("Location", `${req.Referer}/${dni}`);
      res.status(201).send(newStudent);
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  updateStudent = async (req, res) => {
    const { dni } = req.params;
    const { names, lastname, dateOfBith } = req.body;
    if (!dni || (!names && !lastname && !dateOfBith)) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const updated = await this.#studentservice.updateStudent(
      dni,
      names,
      lastname,
      dateOfBith
    );
    res.status(200).send(updated);
  };

  deleteStudent = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const deleted = await this.#studentservice.deleteStudent(dni);
    res.status(201).send(deleted);
  };

  getOne = async (req, res) => {
    const { dni } = req.params;
    console.log("getOne student", req.params);
    if (!dni) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const student = await this.#studentservice.getOne(dni);
    if (!student) return res.status(404).end();
    res.status(200).send(student);
  };

  listCourses = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    res.status(200).send(await this.#courseService.getAllByStudent(dni));
  };

  getCourse = async (req, res) => {
    const { dni, id } = req.params;
    if (!dni || !id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const course = await this.#courseService.getOne(id);
  };

  cancelCourse = (req, res) => {};

  enrollCourse = async (req, res) => {
    const { dni } = req.params;
    const { code, semester } = req.body;
    if (!dni || !code || !semester) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const enrolled = await this.#enrollmenService.create(dni, code, semester);
    if (!enrolled) {
      return res.status(500).send("No se pudo guardar la información");
    }
    const created = await this.#courseService.getOne(code);
    res.status(201).send(created);
  };
}
export { StudentController };
