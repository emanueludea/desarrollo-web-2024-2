export default class Anime{
    constructor(id, name, url){
        this.id = id;
        this.name = name;
        this.url = url;
    }

 /* Llamados a la API*/
    static async getGenres(){
        let genres = [];
        const resp = await fetch('https://api.jikan.moe/v4/genres/anime');
        if(resp.status !== 200){
            throw new Error('Hubo error trayendo los géneros');
        }
        const data = (await resp.json()).data;
        data.forEach(element => {
            genres.push(new Anime(element.mal_id, element.name, element.url));
        });
        return genres;
    }

}