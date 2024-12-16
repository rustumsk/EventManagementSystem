import { Request, Response } from "express";
import { deleteParticipantById } from "../../../../model/participantModel/delete/deleteParticipant";

const deleteParticipantByIdController = async(req:Request, res:Response) =>{
    const {participant_id} = req.params;
    try{
        await deleteParticipantById(participant_id);
        res.status(200).json("Deleted!");
    }catch(e){
        res.status(500).json("Error Deleting!");
    }
}

export {deleteParticipantByIdController};