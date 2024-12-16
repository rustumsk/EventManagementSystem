import { Request,Response } from "express";
import { deleteDraftById } from "../../../../model/draftModel/delete/deleteDraft";

const deleteDraftByIdController = async(req:Request, res:Response) =>{
    const {draft_id} = req.params;
    try{
        await deleteDraftById(draft_id);
        res.status(200).json("Draft Deleted!");
    }catch(e){
        res.status(500).json("Internal Server Error!");
    }
}

export {deleteDraftByIdController}