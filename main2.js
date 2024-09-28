import { API_BASE_URL, createOption, manageForm } from "./resources/modules/api.js";

window.addEventListener("load", async () => {
    console.log("cargó la página");
    //   const sel = document.getElementsByTagName('select')[0];
    const sel = document.getElementById("sel-generos");
    sel.appendChild(
      createOption({ text: "Seleccione", value: "", selected: true })
    );
    const response = await fetch(
      `${API_BASE_URL}/genres/anime?filter=genres`
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