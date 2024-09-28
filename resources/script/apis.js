function createOption(item) {
  const option = document.createElement("option");
  option.text = item.text;
  option.value = item.value;
  option.selected = item.selected;
  return option;
}

function createSection(item) {
  const content = `<h2>${item.title}</h2>
  <img src="${item.image}" alt="${item.title}">`;
  const section = document.createElement("section");
  section.className = 'card';
  section.innerHTML = content;
  section.addEventListener('click', manageSectionClick)
  return section;
}

function manageSectionClick(ev){
  console.log('Hicieron click en la seccion');
}

window.addEventListener("load", async () => {
  console.log("cargó la página");
  //   const sel = document.getElementsByTagName('select')[0];
  const sel = document.getElementById("sel-generos");
  sel.appendChild(
    createOption({ text: "Seleccione", value: "", selected: true })
  );
  const response = await fetch(
    "https://api.jikan.moe/v4/genres/anime?filter=genres"
  );
  console.log(response);
  const data = (await response.json()).data;
  console.log(data);
  const generos = data.map((item) => ({
    text: item.name,
    value: item.mal_id,
    selected: false,
  }));
  console.log("generos", generos);
  generos.forEach((item) => {
    sel.appendChild(createOption(item));
  });
  const form = document.getElementsByTagName("form")[0];
  form.addEventListener("submit", manageForm);
});

const manageForm = async function (ev) {
  ev.preventDefault();
  console.log("Vamos a enviar el formulario");
  const sel = ev.target.querySelector("select");
  console.log(sel.value);
  const response = await fetch("https://api.jikan.moe/v4/anime?genres=46");
  const data = (await response.json()).data;
  console.log(data);
  // const sec = createSection({ title: "Mi pelicula de Anime", image: "" });
  // document.getElementById("main").appendChild(sec);
  // document.querySelector("main").appendChild(sec);
  const main = document.querySelector("main");
  main.innerHTML = '';
  data.forEach((item) => {
    main.appendChild(createSection({
      title: item.title,
      image: item.images.webp.image_url
    }));
  });
};
