import { Request,Response } from "express";
import { updateParticipantStatus } from "../../../../model/participantModel/update/updateParticipant";

const updateParticipantStatusController = async(req:Request, res:Response) =>{
    const {participant_id, attendance_status, checked_in} = req.body;
    try{
        await updateParticipantStatus(participant_id, attendance_status, checked_in);
        res.status(200).json("Participant Updated!");
    }catch(e){
        console.log(e);
        res.status(500).json("Error updating participant!");
    }
}

export {updateParticipantStatusController}