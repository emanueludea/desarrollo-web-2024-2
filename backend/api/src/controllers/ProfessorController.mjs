import { ProfessorService } from "../services/ProfessorService.mjs";
import { CustomError } from "../utils/CustomError.mjs";

class ProfessorController {
  #service;
  constructor() {
    this.#service = new ProfessorService();
  }

  getAll = async (req, res) => {
    const list = await this.#service.getAll();
    res.send(list);
  };

  createProfessor = async (req, res) => {
    const { dni, names, lastname, date_of_birth } = req.body;
    if (!dni || !names || !lastname) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const created = await this.#service.createProfessor(
      dni,
      names,
      lastname,
      date_of_birth
    );
    console.log(created, "created");
    if (created == null) res.status(500).send("error");
    else res.status(201).send(created);
  };

  updateProfessor = async (req, res) => {
    const { dni } = req.params;
    const { name, lastname } = req.body;
    if (!dni || !name || !lastname) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const updated = await this.#service.updateProfessor(dni, name, lastname);
    res.status(200).send(updated);
  };

  deleteProfessor = async (req, res) => {
    const { dni } = req.params;
    if (!dni) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    try {
      await this.#service.deleteProfessor(dni);
      res.status(204).end();
    } catch (error) {
      if (error instanceof CustomError)
        return res.status(500).send({ code: error.code, message: error.message });
      throw error;
    }
  };

  getOne = async (req, res) => {
    const { dni } = req.params;
    console.log("getOne faculty", req.params);
    if (!dni) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const professor = await this.#service.getOne(dni);
    if (!professor) return res.status(404).end();
    res.status(200).send(professor);
  };
}

export { ProfessorController };
