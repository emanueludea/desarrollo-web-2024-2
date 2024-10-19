import express from "express";
import {
  createUser,
  defaultResponse,
  deleteUser,
  getUsers,
  updateUser,
} from "./router.js";
import { setContentType } from "./middleware.js";

const app = express();
app.use(express.json());
app.use(setContentType);

app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.all("*", defaultResponse);

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
