import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
// const expressOasGenerator = require('express-oas-generator');
// import expressOasGenerator from "express-oas-generator";
import * as swaggerUi from "swagger-ui-express";

import { setContentType } from "./middlewares/middleware.mjs";

import { CourseRoutes } from "./routes/CourseRoutes.mjs";
import { DegreeRoutes } from "./routes/DegreeRoutes.mjs";
import { FacultyRoutes } from "./routes/FacultyRoutes.mjs";
import { ProfessorRoutes } from "./routes/ProfessorRoutes.mjs";
import { StudentRoutes } from "./routes/StudentRoutes.mjs";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "University API",
      description: "A sample API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.mjs"],
};

const spec = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));

app.get("/api-docs.json", (req, res) => {
  res.send(spec);
});

app.use(express.json());
app.use(setContentType);

const courseRoutes = new CourseRoutes();
const degreeRoutes = new DegreeRoutes();
const facultyRoutes = new FacultyRoutes();
const professorRoutes = new ProfessorRoutes();
const studentRoutes = new StudentRoutes();

app.use("/courses", courseRoutes.router);
app.use("/degrees", degreeRoutes.router);
app.use("/faculties", facultyRoutes.router);
app.use("/professors", professorRoutes.router);
app.use("/students", studentRoutes.router);

app.all("*", (req, res) => {
  res.status(404).send(JSON.stringify({ message: "invalid path" }));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// expressOasGenerator.handleRequests();
app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
