import { Request,Response } from "express";
import { deleteSboById } from "../../../../model/sboModel/delete/deleteSbo";

const deleteSboByIdController = async(req:Request,res:Response) =>{
    const {sbo_id} = req.params;
    try{
        await deleteSboById(sbo_id);
        res.status(200).json("Sbo Deleted!");
    }catch(e){
        res.status(500).json("Internal Server Error");
    }
}

export {deleteSboByIdController};