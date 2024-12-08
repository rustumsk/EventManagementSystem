import { Request,Response } from "express";
import { getDraftById } from "../../../../model/draftModel/read/getDraft";

const getDraftByIdController = async(req:Request,res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const data = await getDraftById(sbo_id);
        res.status(200).json(data);
    }catch(e){
        res.status(404).json({message:"Internal Server Error!"});
    }
}

export {getDraftByIdController};