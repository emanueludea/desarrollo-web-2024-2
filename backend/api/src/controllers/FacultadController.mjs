import { FacultadService } from "../services/FacultadService.mjs";
// Manipulo el request/response
// llamo a los servicios
class FacultadController{
    constructor(){
        this.service = new FacultadService();
    }
    getAll = async (req, res)=>{
        const facultades = await this.service.getAll();
        res.send(facultades);
    };
    crearFacultad = (req,res) =>{
        const nombre = req.body;
        if(body){
            this.service.crearFacultad();
            res.status(201);
        }
    }
    actualizarFacultad = (req, res)=>{

    }
    eliminarFacultad = (req, res)=>{

    }
}
export {FacultadController};