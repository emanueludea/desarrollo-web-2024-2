let a = document.querySelector("input");

function manjeador1(ev) {
  console.log("click en el input");
  a.classList.forEach((x) => console.log(x));
  ev.stopImmediatePropagation();
}

const manejador2 = function () {
  console.log("segundo manejador");
};

a.addEventListener("click", manjeador1);

a.addEventListener("click", manejador2);


document.getElementById("miForm").addEventListener("submit", (ev) => {
  console.log("estamos enviando el formulario");
  // ev.preventDefault();
});

let mia = document.getElementById("mia");
mia.addEventListener("click", (evt) => {
  evt.preventDefault();
  console.log(evt);
});


const miMain = document.querySelector('main');
miMain.addEventListener('click', ()=>{
    console.log('click en el main');
});

const miForm = document.querySelector('form');
miForm.addEventListener('click', (ev)=>{
    console.log('click en el form');
    ev.stopPropagation();
});

const miDIv = document.querySelector('div');
miDIv.addEventListener('click', (ev)=>{
    console.log('click en el div');
    ev.stopPropagation();
});