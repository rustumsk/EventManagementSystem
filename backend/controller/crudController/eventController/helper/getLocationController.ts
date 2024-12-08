import { Request, Response } from "express";
import { getLocationById } from "../../../../model/eventModel/helper/getLocation";

const getLocByIdController = async(req:Request, res:Response) =>{
    const {location_id} = req.params;
    try{
        const data = await getLocationById(location_id);
        res.status(200).json(data);
    }catch(e){
        res.status(404).json({message:"Internal Server Error!"});
    }
}

export {getLocByIdController}