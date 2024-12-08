import e, { Request,Response } from "express"
import { createEvent } from "../../../../model/eventModel/create/createEvent";

const createEventController = async (req:Request , res:Response) =>{
    const {sbo_id, event_description, event_name,event_date,location_id,category_id, capacity, ends_at, event_image, custom_fields, event_type} = req.body;

    try{
        const created = await createEvent(sbo_id,event_description,event_name,event_date, location_id,category_id,capacity,ends_at,event_image, custom_fields, event_type);
        console.log(created);
        if(created){
            res.status(200).json({message: "Event Created!"});
        }
    }catch(e){
        res.status(400).json({message: e});
    }
    
}

export {createEventController}