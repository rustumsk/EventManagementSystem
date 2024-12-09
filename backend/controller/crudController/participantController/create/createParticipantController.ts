import { Request, Response } from "express";
import { createParticipant } from "../../../../model/participantModel/create/createParticipant";
const createParticipantController = async(req:Request, res:Response) =>{
    const {event_id, student_id,attendance_status,custom_responses} = req.body;
    try{
        const data = await createParticipant(event_id,student_id,attendance_status, custom_responses);
        res.status(200).json(data);
    }catch(e){
        res.status(400).json(e);
    }
}

export default createParticipantController;