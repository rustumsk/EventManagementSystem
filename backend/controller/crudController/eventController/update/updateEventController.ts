import { Request,Response } from "express";
import { updateIsOpen, updateIsDone } from "../../../../model/eventModel/update/updateEvent";

const updateIsOpenController = async(req:Request, res:Response) =>{
    const {event_id} = req.body;
    try{
        await updateIsOpen(event_id);
        res.status(200).json("Event is now closed!");
    }catch(e){  
        res.status(500).json(e);
    }
};

const updateIsDoneController = async(req: Request, res:Response) =>{
    const {event_id} = req.body;
    try{
        await updateIsDone(event_id);
        res.status(200).json("Event is now closed!");
    }catch(e){
        res.status(500).json(e);
    }
};

export {updateIsOpenController, updateIsDoneController}