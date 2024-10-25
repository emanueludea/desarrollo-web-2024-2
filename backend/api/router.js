import * as fs from "fs";
import {
  getUsers as getUsersDB,
  createUser as createUserDB,
  updateUser as updateUserDB,
  deleteUser as deleteUserDB,
} from "./database.js";

const getUsers = async (req, res) => {
  const users = await getUsersDB();
  const result = JSON.stringify(users);
  // res.set('content-lenght', Buffer.byteLength(result));
  res.status(200).send(result);
};

const createUser = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  const { nombre, telefono } = req.body;
  //validar, agregar en DB, etc
  await createUserDB(nombre, telefono);
  res.status(201).send(JSON.stringify(req.body));
};

const updateUser = async (req, res) => {
  console.log(`El usuario que quieren actualizar es ${req.params.id}`);
  const { nombre } = req.body;
  const { id } = req.params;
  await updateUserDB(id, nombre);
  res
    .status(200)
    .send(JSON.stringify({ message: "se actualizó correctamente" }));
};
const deleteUser = async (req, res) => {
  console.log(`El usuario que quieren eliminar es ${req.params.id}`);
  const { id } = req.params;
  await deleteUserDB(id);
  res.status(200).send("Usuario eliminado");
};

const defaultResponse = (req, res) => {
  res.status(404).send(JSON.stringify({ message: "NO existe esa ruta" }));
};

export { getUsers, createUser, updateUser, deleteUser, defaultResponse };
