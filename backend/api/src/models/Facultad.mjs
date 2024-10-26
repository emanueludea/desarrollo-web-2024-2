// Clase que modela la entidad
class Facultad {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  alarma = (mesaje) => {
    console.log(mesaje);
  };
}
export { Facultad };
