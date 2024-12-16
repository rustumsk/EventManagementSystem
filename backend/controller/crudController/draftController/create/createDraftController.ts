import { Request,Response } from "express";
import createDraft from "../../../../model/draftModel/create/createDraft";

const createDraftController = async(req:Request, res:Response) =>{
    const {sbo_id, draft_name, event_data} = req.body;

    try{
        await createDraft(sbo_id, draft_name, event_data);
    }catch(e:any){
        res.status(404).json(e);
    }
}

export default createDraftController;

