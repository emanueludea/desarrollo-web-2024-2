// Manipulo el request/response

import { DegreeService } from "../services/DegreeService.mjs";

// llamo a los servicios
class DegreeController {
  #service;
  constructor() {
    this.#service = new DegreeService();
  }
  getAll = async (req, res) => {
    const lista = await this.#service.getAll();
    res.send(lista);
  };

  createDegree = async (req, res) => {
    const { name, faculty_id } = req.body;
    if (!name || !faculty_id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const newDegree = await this.#service.createDegree(name, faculty_id);
    console.log(newDegree, "newDegree");
    if (newDegree == null) res.status(500).send("error");
    else res.status(201).send(newDegree);
  };

  updateDegree = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const updated = await this.#service.updateDegree(id, name);
    res.status(200).send(updated);
  };

  deleteDegree = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    try {
      await this.#service.deleteDegree(id);
      res.status(204).send(deleted);
    } catch (error) {
      if (error instanceof CustomError)
        res.status(500).send({ code: error.code, message: error.message });
      throw error;
    }
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ code: 400, message: "some data missing" });
    }
    const selected = await this.#service.getOne(id);
    res.status(201).send(selected);
  };
}
export { DegreeController };
