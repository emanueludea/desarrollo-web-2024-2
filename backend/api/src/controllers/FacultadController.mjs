import { FacultadService } from "../services/FacultadService.mjs";
// Manipulo el request/response
// llamo a los servicios
class FacultadController {
  #service;
  constructor() {
    this.#service = new FacultadService();
  }
  getAll = async (req, res) => {
    const facultades = await this.#service.getAll();
    res.send(facultades);
  };
  crearFacultad = async (req, res) => {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.crearFacultad(nombre);
    // console.log(nueva);
    res.status(201).send(nueva);
  };

  actualizarFacultad = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre || !id) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.actualizarFacultad(id, nombre);
    res.status(200).send(nueva);
  };

  eliminarFacultad = async(req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.borrarFacultad(id);
    res.status(201).send(nueva);
  };
}
export { FacultadController };
