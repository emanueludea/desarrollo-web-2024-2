export default class Pet{
    constructor(id, name, type){
        this.id = id;
        this.name = name;
        this.type = type;
    }

 /* Llamados a la API */
    static async getAll(){
        let list = [];
        const resp = await fetch('http://localhost:4010/pets');
        if(resp.status !== 200){
            throw new Error('Hubo error trayendo los géneros');
        }
        const data = (await resp.json());
        // console.log(data);
        data.forEach(element => {
            list.push(new Pet(element.id, element.name, element.tag));
        });
        return list;
    }   

    static async getOne(petId){
        try {
            const resp = await fetch(`http://localhost:4010/pets/${petId}`);   
            const data = await resp.json();
            console.log('getOne',data);
            return new Pet(data.id, data.name, data.tag);
        } catch (error) {
            console.log('hubo error al traer una sola mascota');
        }
    }

    static async saveOne(data){
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const resp = await fetch('http://localhost:4010/pets', options);
        console.log(resp);
        return await resp.json();
    }

}