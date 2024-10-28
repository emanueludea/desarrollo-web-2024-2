class Alumno {
  constructor(cedula, nombres, apellidos, fechaNacimiento) {
    this.cedula = cedula;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.setEdad();
  }

  setEdad() {
    if(!this.fechaNacimiento){
      return this.edad = null;
    }
    const dia = 24 * 60 * 60 * 1000;
    const cantDias = (new Date() - this.fechaNacimiento) / dia;
    this.edad = Math.floor(cantDias / 365.25);
  }

  static fromObject(obj) {
    return new Alumno(
      obj.cedula,
      obj.nombres,
      obj.apellidos,
      obj.fecha_nacimiento
    );
  }
}

export { Alumno };
