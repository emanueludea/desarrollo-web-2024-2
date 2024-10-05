import Pet from "./pet.js";

export default class App {
  /* Modificar el DOM / escuchar eventos*/
  constructor() {
    let item = document.getElementById("pet-form");
    item.addEventListener("submit", this.#onSubmit);

    item = document.getElementById('pet-id');
    item.addEventListener("change",this.#onIdChange);

    item = document.getElementById("send-pet");
    item.addEventListener("submit", this.#onSendPet);
  }

  #onIdChange = (ev)=>{
    const item = document.getElementById('pet-id');
    const inputValue = ev.currentTarget.value;
    console.log("cambió el valor",inputValue);
    if(inputValue < 0){
        item.className = 'error';
    }else if(inputValue == 0){
        item.className = 'neutral';
    }else{
        item.className = 'ok';
    }    
  }

  #onSubmit = async (ev) => {
    ev.preventDefault();
    const item = document.getElementById('pet-id');
    const inputValue = item.value;
    let data;
    if(inputValue < 0){
        data = 'No se pueden traer mascotas con id negativo';
    }else if(inputValue == 0){
        // console.log("Vamos a consultar las mascotas");
        data = JSON.stringify(await Pet.getAll());
    }else{
        data = await Pet.getOne(inputValue);
        console.log(data);
        document.querySelector('#pet-id2').value = data.id;
        document.querySelector('#pet-name2').value = data.name;
        document.querySelector('#pet-type2').value = data.type;

        data = JSON.stringify(data);
    }
    this.#printResult(data);
  };

  #onSendPet = async (ev) => {
    ev.preventDefault();
    const data = {};
    data.id = document.querySelector('#pet-id2').value;
    data.name = document.querySelector('#pet-name2').value;
    data.tag = document.querySelector('#pet-type2').value;
    const respData = await Pet.saveOne(data);
    console.log(respData);
  }

  #printResult = (data) => {
    console.log(data);
    const result = document.querySelector("#result")
    result.textContent = data;
  };
}
