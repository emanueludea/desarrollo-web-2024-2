console.log("Iniciamos");

class Carro {
  static cantidad = 0;
  #marca; // propiedad privada
  #llantas; // propiedad privada
  constructor(marca = "FORD", llantas = 4) {
    this.#marca = marca;
    this.#llantas = llantas;
    Carro.cantidad++;
  }
  get marca() {
    return this.#marca;
  }
  set marca(nMarca) {
    this.#marca = nMarca;
  }
  static frenar() {
    console.log("Vamos bajando velocidad");
  }
  pitar() {
    console.log("PIIIIIII");
  }
}

let carro1 = new Carro();

// const miJson = fetch('./resources/items.json');
// miJson.then((resp)=>{
//   console.log(resp.status);
//   return resp.json();
// }).then((json)=>{
//   console.log(json);
// });

(async function manejarFetch() {
  console.log("funcion autollamada");
  // const resp = await fetch(URL, OPTIONS);
  const resp = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
    method:  "GET", //GET POST PUT PATCH DELETE
  });

  let status = resp.status;
  console.log(status);
  if (status === 200) {
    const json = await resp.json();
    console.log(json);
  }
})();
