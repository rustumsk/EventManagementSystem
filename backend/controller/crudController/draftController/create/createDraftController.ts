import { Request,Response } from "express";
import createDraft from "../../../../model/draftModel/create/createDraft";

const createDraftController = async(req:Request, res:Response) =>{
    const {sbo_id, draft_name, event_data} = req.body;

    try{
        await createDraft(sbo_id, draft_name, event_data);
    }catch(e){
        res.status(404).json({message: "Internal Server Error!", error: e})
    }
}

export default createDraftController;

