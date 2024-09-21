let a = document.querySelector('input');
a.addEventListener('click', ()=>{
    console.log('click en el input');
    a.classList.forEach((x) => console.log(x));

})

document.getElementById('miForm').addEventListener('submit', (ev)=>{
    console.log('estamos enviando el formulario');
    ev.preventDefault()
})