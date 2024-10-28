// Clase que modela la entidad
class Facultad {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
  static fromObject(obj) {
    return new Facultad(obj.id, obj.nombre);
  }
}
export { Facultad };
