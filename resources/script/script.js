console.log('Iniciamos');

class Carro {
  static cantidad = 0;
  #marca; // propiedad privada
  #llantas; // propiedad privada
  constructor(marca = 'FORD', llantas = 4){
    this.#marca = marca;
    this.#llantas = llantas;
    Carro.cantidad++;
  }
  get marca(){
    return this.#marca;
  }
  set marca(nMarca){
    this.#marca = nMarca;
  }
  static frenar(){
    console.log('Vamos bajando velocidad');
  }
  pitar(){
    console.log('PIIIIIII');
  }
}


let carro1 = new Carro();