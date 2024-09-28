"use strict";

class ApiClass {
  static API_BASE_URL = "https://api.jikan.moe/v4";
  createOption(item) {
    const option = document.createElement("option");
    option.text = item.text;
    option.value = item.value;
    option.selected = item.selected;
    return option;
  }

  static createSection(item) {
    const content = `<h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">`;
    const section = document.createElement("section");
    section.className = "card";
    section.innerHTML = content;
    section.addEventListener("click", this.manageSectionClick);
    return section;
  }

  manageSectionClick(ev) {
    console.log("Hicieron click en la seccion");
  }

  async manageForm(ev) {
    ev.preventDefault();
    console.log("Vamos a enviar el formulario");
    const sel = ev.target.querySelector("select");
    console.log(sel.value);
    const response = await fetch(
      `${ApiClass.API_BASE_URL}/anime?genres=${sel.value}`
    );
    const data = (await response.json()).data;
    console.log(data);
    // const sec = createSection({ title: "Mi pelicula de Anime", image: "" });
    // document.getElementById("main").appendChild(sec);
    // document.querySelector("main").appendChild(sec);
    const main = document.querySelector("main");
    main.innerHTML = "";
    data.forEach((item) => {
      main.appendChild(
        ApiClass.createSection({
          title: item.title,
          image: item.images.webp.image_url,
        })
      );
    });
  }
}
export { ApiClass };
