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

const getEventBystudentIdController = async (req:Request, res:Response) =>{
  try{
    const {student_id} = req.params;
    const data = await getEvent.getEventByStudentId(student_id);
    res.status(200).json(data);
  }catch(e){
    res.status(500).json(e);
  }
}

const getTopEventController = async (req:Request, res:Response) =>{
  try{
    const data = await getEvent.getTopEvent();
    res.status(200).json(data);
  }catch(e){
    res.status(500).json(e);
  }
}
export {getEventByIdController, getEventByIdNameController, getEventBystudentIdController,getTopEventController}