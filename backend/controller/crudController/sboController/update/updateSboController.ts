import { Request,Response } from "express";
import { updateSboStatus } from "../../../../model/sboModel/update/updateSbo";

const updateSboStatusController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.body;
    try{
        await updateSboStatus(sbo_id);
        res.status(200).json("SBO Updated!");
    }catch(e){
        res.status(500).json("Something Went Wrong!");
    }
}
export{updateSboStatusController}