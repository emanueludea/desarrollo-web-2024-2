// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { ProfessorController } from "../controllers/ProfessorController.mjs";

class ProfessorRoutes {
  constructor() {
    this.router = Router();
    this.controller = new ProfessorController();

    /**
     * @openapi
     * components:
     *  schemas:
     *    Error:
     *      type: object
     *      properties:
     *        code:
     *          type: string
     *          example: 20359
     *        message:
     *          type: string
     *          example: there are item depending on it
     *    Professor:
     *      type: object
     *      properties:
     *        dni: 
     *          type: string
     *          description: professor dni
     *          example: 1010101010
     *        name: 
     *          type: string
     *          description: professor name
     *          example: Natalia
     *        lastname: 
     *          type: string
     *          description: professor lastname
     *          example: gaviria
     * /professors:
     *  get:
     *    description: get all professors
     *    responses: 
     *      200: 
     *        description: Returns a list of objects
     *        content:
     *           application/json:
     *            schema:
     *              type: array
     *              items: 
     *                $ref: '#/components/schemas/Professors'
     *  post:
     *    description: Creates a new professor
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Professor'
     *    responses: 
     *      201: 
     *        description: Returns the newly created professor
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Professor'
     *      500:
     *        description: Some error ocurred
     * /professors/{dni}:
     *  parameters:
     *    - name: dni
     *      in: path
     *      required: true
     *  put:
     *    description: Edit an existing professor
     *    responses: 
     *      200: 
     *        description: Returns the updated course
     *  delete:
     *    description: Deletes a given course
     *    responses: 
     *      204: 
     *        description: resource successfully deleted
     *      404:
     *        description: resource not found
     *      500:
     *        description: cannot delete resource due to some error
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Error'
     */
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createProfessor);
    this.router
      .route("/:dni")
      .get(this.controller.getOne)
      .put(this.controller.updateProfessor)
      .delete(this.controller.deleteProfessor);
  }
}
export { ProfessorRoutes };
