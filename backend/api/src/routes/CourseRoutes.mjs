// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { CourseController } from "../controllers/CourseController.mjs";

class CourseRoutes {
  constructor() {
    this.router = Router();
    this.controller = new CourseController();
    /**
     * @openapi
     * components:
     *  schemas:
     *    Course:
     *      type: object
     *      properties:
     *        code: 
     *          type: string
     *          description: the course code
     *          example: mat0001
     *        name: 
     *          type: string
     *          description: the course name
     *          example: matemáticas I
     *        credits: 
     *          type: integer
     *          description: the amount of credits
     *          example: 3
     * /courses:
     *  get:
     *    description: get all registered courses
     *    responses: 
     *      200: 
     *        description: Returns a list of objects
     *        content:
     *           application/json:
     *            schema:
     *              type: array
     *              items: 
     *                $ref: '#/components/schemas/Course'
     *  post:
     *    description: Creates a new course
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Course'
     *    responses: 
     *      201: 
     *        description: Returns the newly created course
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Course'
     * /courses/{code}:
     *  parameters:
     *    - name: code
     *      in: path
     *      required: true
     *  get:
     *    description: return an specific item
     *    responses:
     *      200:
     *        description: success
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Course'
     *  put:
     *    description: Modify a given course
     *    responses: 
     *      200: 
     *        description: success
     *  delete:
     *    description: Deletes a given course
     *    responses: 
     *      204: 
     *        description: successfully deleted
     */
    this.router
      .route("/")
      .get(this.controller.getAll)
      .post(this.controller.createCourse);
    this.router
      .route("/:code")
      .get(this.controller.getOne)
      .put(this.controller.updateCourse)
      .delete(this.controller.deleteCourse);
  }
}
export { CourseRoutes };
