import { Request,Response } from "express";
import createLocation from "../../../../model/eventModel/helper/createLocation";

const createLocationController = async(req:Request, res:Response) =>{
    const {location_city, location_name} = req.body;
    try{
        const location_id = await createLocation(location_city, location_name);
        res.status(200).json({message:"Location Created!", location_id: location_id});
    }catch(e){
        res.status(400).json({error: e});
    }
}

export default createLocationController