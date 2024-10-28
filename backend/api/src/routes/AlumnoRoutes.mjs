// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { AlumnoController } from "../controllers/AlumnoController.mjs";

class AlumnoRoutes {
  constructor() {
    this.router = Router();
    this.controller = new AlumnoController();
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.crearAlumno);
    this.router
      .route("/:cedula")
      .put(this.controller.actualizarAlumno)
      .delete(this.controller.eliminarAlumno);
  }
}
export { AlumnoRoutes };
