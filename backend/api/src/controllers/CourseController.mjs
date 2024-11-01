import { validationResult, matchedData } from "express-validator";
import { CourseService } from "../services/CourseService.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class CourseController {
  #service;
  constructor() {
    this.#service = new CourseService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createCourse = async (req, res) => {
    // const { code, name, credits } = req.body;
    // if (!code || !name || !credits) {
    //   return res.status(400).send({ code: 400, message: "some data missing" });
    // }
    const validated = validationResult(req);
    if (!validated.isEmpty()) {
      console.log(result);
      return res.status(400).send({ errors: validated.array() });
    }
    const { code, name, credits } = matchedData(req);
    console.log(code, typeof code, name, typeof name, credits, typeof credits);
    try {
      const result = await this.#service.createCourse(code, name, credits);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  updateCourse = async (req, res) => {
    const { code } = req.params;
    const { name, credits } = req.body;
    if (!name || !credits) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const updated = await this.#service.updateCourse(code, name, credits);
    res.status(200).send(updated);
  };

  deleteCourse = async (req, res) => {
    const { code } = req.params;
    if (!code) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    try {
      const deleted = await this.#service.deleteCourse(code);
      res.status(204).send(deleted);
    } catch (error) {
      if (error instanceof CustomError)
        return res
          .status(500)
          .send({ code: error.code, message: error.message });
      throw error;
    }
  };

  getOne = async (req, res) => {
    const { code } = req.params;
    if (!code) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const course = await this.#service.getOne(code);
    res.send(course);
  };
}

export { CourseController };
