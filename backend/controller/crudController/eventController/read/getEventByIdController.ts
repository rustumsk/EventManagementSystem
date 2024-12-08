import { Request,Response } from "express";
import getEvent from '../../../../model/eventModel/read/getEvent';
const getEventByIdController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{    
        const data = await getEvent.getMyEventWithId(sbo_id);
        console.log(data);
        res.status(200).json(data);
    }catch(e){
        console.log("Hello!");
    }
}
export {getEventByIdController}