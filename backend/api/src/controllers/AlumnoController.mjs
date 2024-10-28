// Manipulo el request/response

import { AlumnoService } from "../services/AlumnoService.mjs";

// llamo a los servicios
class AlumnoController {
  #service;
  constructor() {
    this.#service = new AlumnoService();
  }
  getAll = async (req, res) => {
    const lista = await this.#service.getAll();
    res.send(lista);
  };
  crearAlumno = async (req, res) => {
    const { cedula, nombres, apellidos, fechaNacimiento } = req.body;
    if (!cedula || !nombres || !apellidos) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.crearAlumno(
      cedula,
      nombres,
      apellidos,
      fechaNacimiento ?? null
    );
    console.log(nueva, "nueva");
    if (nueva == null) res.status(500).send('error');
    else res.status(201).send(nueva);
  };

  actualizarAlumno = async (req, res) => {
    const { cedula } = req.params;
    const { nombres, apellidos, fechaNacimiento } = req.body;
    if (!cedula || (!nombres && !apellidos && !fechaNacimiento)) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.actualizarAlumno(
      cedula,
      nombres,
      apellidos,
      fechaNacimiento
    );
    res.status(200).send(nueva);
  };

  eliminarAlumno = async (req, res) => {
    const { cedula } = req.params;
    if (!cedula) {
      return res.status(401).send("datos inválidos");
    }
    const nueva = await this.#service.eliminarAlumno(cedula);
    res.status(201).send(nueva);
  };
}
export { AlumnoController };
