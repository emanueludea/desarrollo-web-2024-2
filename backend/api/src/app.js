import express from "express";
import { setContentType } from "./middlewares/middleware.mjs";
import { AlumnoRoutes } from "./routes/AlumnoRoutes.mjs";
import { FacultadRoutes } from "./routes/FacultadRoutes.mjs";

const app = express();
app.use(express.json());
app.use(setContentType);

const facRutes = new FacultadRoutes();
const alRoutes = new AlumnoRoutes();

app.use("/facultad", facRutes.router);
app.use("/alumno", alRoutes.router);

app.all("*", (req, res) => {
  res.status(404).send(JSON.stringify({ message: "NO existe esa ruta" }));
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
