// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { DegreeController } from "../controllers/DegreeController.mjs";

class DegreeRoutes {
  constructor() {
    this.router = Router();
    this.controller = new DegreeController();

    /**
     * @openapi
     * components:
     *  schemas:
     *    Degree:
     *      type: object
     *      properties:
     *        id: 
     *          type: string
     *          description: the degree sequential identifier
     *          example: 1
     *        name: 
     *          type: string
     *          description: the degree name
     *          example: Ingeniería electrónica
     * /degrees:
     *  get:
     *    description: get all degrees
     *    responses: 
     *      200: 
     *        description: Returns a list of objects
     *        content:
     *           application/json:
     *            schema:
     *              type: array
     *              items: 
     *                $ref: '#/components/schemas/Degree'
     *  post:
     *    description: Creates a new degree
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Degree'
     *    responses: 
     *      201: 
     *        description: Returns the newly created degree
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Degree'
     * /degrees/{id}:
     *  parameters:
     *    - name: id
     *      in: path
     *      required: true
     *  put:
     *    description: Modify a given degree
     *    responses: 
     *      200: 
     *        description: Returns the updated degree
     *  delete:
     *    description: Deletes a given degree
     *    responses: 
     *      200: 
     *        description: Returns the deleted degree
     */
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createDegree);
    this.router
      .route("/:id")
      .get(this.controller.getOne)
      .put(this.controller.updateDegree)
      .delete(this.controller.deleteDegree);
  }
}
export { DegreeRoutes };
