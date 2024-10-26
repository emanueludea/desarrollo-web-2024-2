// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { FacultadController } from "../controllers/FacultadController.mjs";

class FacultadRoutes {
  constructor() {
    this.router = Router();
    this.controller = new FacultadController();
    this.router.get("/", this.controller.getAll);
    this.router.post("/", this.controller.crearFacultad);
    this.router.put("/:id", this.controller.actualizarFacultad);
    this.router.delete("/:id", this.controller.eliminarFacultad);
  }
}
export { FacultadRoutes };
