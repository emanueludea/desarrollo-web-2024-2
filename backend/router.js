const users = [
  {
    id: 1,
    nombre: "Carlos",
    telefono: "31222222222",
  },
  {
    id: 2,
    nombre: "MIguel",
    telefono: "3128976542",
  },
  {
    id: 3,
    nombre: "Antonio",
    telefono: "3125879856",
  },
];

const getUsers = (req, res) => {
  res.status(200).send(JSON.stringify(users));
};

const createUser = (req, res) => {
  console.log(req.body);
  //validar, agregar en DB, etc
  req.body.id = 987;
  res.status(201).send(JSON.stringify(req.body));
};

const updateUser = (req, res) => {
  console.log(`El usuario que quieren actualizar es ${req.params.id}`);
  let exists = false;
  users.forEach((item) => {
    if (item.id == req.params.id) exists = true;
  });
  if (exists) {
    res
      .status(200)
      .send(JSON.stringify({ message: "se actualizó correctamente" }));
  } else {
    res.status(500).send(JSON.stringify({ message: "el usuario no existe" }));
  }
};
const deleteUser = (req, res) => {
  console.log(`El usuario que quieren eliminar es ${req.params.id}`);
  res.status(200).send("Usuario eliminado");
};

const defaultResponse = (req, res) => {
  res.status(404).send(JSON.stringify({ message: "NO existe esa ruta" }));
};

export { getUsers, createUser, updateUser, deleteUser, defaultResponse };
