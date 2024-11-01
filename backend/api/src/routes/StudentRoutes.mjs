// Mapeo el endpoint con el controlador correspondiente
import { Router } from "express";
import { body } from "express-validator";
import { StudentController } from "../controllers/StudentController.mjs";

class StudentRoutes {
  constructor() {
    this.router = Router();
    this.controller = new StudentController();

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
     *    Student:
     *      type: object
     *      properties:
     *        dni:
     *          type: string
     *          description: student dni
     *          example: 2020202020
     *        name:
     *          type: string
     *          description: student name
     *          example: Carlos mario
     *        lastname:
     *          type: string
     *          description: student lastname
     *          example: perez
     * /students:
     *  get:
     *    description: get all students
     *    responses:
     *      200:
     *        description: Returns a list of objects
     *        content:
     *           application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Student'
     *  post:
     *    description: Creates a new student
     *    requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Student'
     *    responses:
     *      201:
     *        description: Returns the newly created student
     *        content:
     *           application/json:
     *            schema:
     *                $ref: '#/components/schemas/Student'
     *      500:
     *        description: Some error ocurred
     * /students/{dni}:
     *  parameters:
     *    - name: dni
     *      in: path
     *      required: true
     *  put:
     *    description: Edit an existing item
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
      .post(
        [
          body("dni").trim().notEmpty(),
          body("names").trim().notEmpty(),
          body("lastname").trim().notEmpty(),
          body("dateOfBirth").trim().isDate().optional(),
        ],
        this.controller.createStudent
      );
    // { dni, names, lastname, dateOfBith }
    this.router
      .route("/:dni")
      .get(this.controller.getOne)
      .put(this.controller.updateStudent)
      .delete(this.controller.deleteStudent);
    this.router
      .route("/:dni/courses")
      .get(this.controller.listCourses)
      .post(this.controller.enrollCourse);
    this.router
      .route("/:dni/courses/:id")
      .get(this.controller.getCourse)
      .delete(this.controller.cancelCourse);
  }
}
export { StudentRoutes };
