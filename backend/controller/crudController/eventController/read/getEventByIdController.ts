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
const getEventByIdNameController = async (req: Request, res: Response) => {
    try {
      console.log('req.query:', req.query); 
      const { sbo_id, event_name, event_date } = req.query;
      const data = await getEvent.getEventByIdNameDate(sbo_id, event_name, event_date);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
export {getEventByIdController, getEventByIdNameController}