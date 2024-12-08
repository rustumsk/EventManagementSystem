import { Request,Response } from "express";
import findSbo from "../../../../model/sboModel/read/findSbo";

const getSboController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const result = await findSbo.findSboById(sbo_id);
        res.status(200).json(result.rows[0]);
    }catch(e){
        console.log(sbo_id);
        console.log(e);
        res.status(403).json({message:"Error"});
    }
}

const getSboNamesController = async(req:Request, res:Response) =>{
    try{
        const result = await findSbo.getAllSbo();
        res.status(200).json(result);
    }catch(e){
        res.status(403).json({message:"Internal server error!"});
    }
}
const getSboIdByNameController = async(req:Request, res:Response) =>{
    const {sbo_name} = req.params;
    try{
        const data = await findSbo.findIdByName(sbo_name);
        res.status(200).json(data);
    }catch(e){
        res.status(404).json({message:"Internal Server Error!"});
    }
}
export {getSboController, getSboNamesController,getSboIdByNameController};