import { Request,Response } from "express";
import { getParticipantIdByEI,getParticipantStatus, getAllParticipantByEventId, getParticipantAverage, getParticipantAverage1, getCheckedParticipantByEventId,getAllParticipantByEventId1, getUncheckedParticipantByEventId } from "../../../../model/participantModel/read/getParticipant";

const getParticipantIdEICotroller = async(req:Request, res:Response) =>{
    const {student_id, event_id} = req.query;
    console.log(student_id, event_id);
    try{
        const data = await getParticipantIdByEI(event_id,student_id);
        res.status(200).json(data);
    }catch(e){
        res.status(500).json(e);
    }
}

const getParticipantStatusController = async(req:Request, res:Response) =>{
    const {student_id, event_id} = req.query;
    try{
        const data = await getParticipantStatus(event_id,student_id);
        res.status(200).json(data);
    }catch(e){
        res.status(500).json(e);
    }
}
const getAllParticipantByEventIdController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const result = await getAllParticipantByEventId(sbo_id);
        res.status(200).json(result);
    }catch(e){  
        res.status(500).json(e);
    }
}

const getParticipantAverageController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const result = await getParticipantAverage(sbo_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json
    }
}

const getParticipantAverageController1 = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const result = await getParticipantAverage1(sbo_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json
    }
}

const getCheckedParticipantByEventIdController = async(req: Request, res:Response) =>{
    const {event_id} = req.params;
    try{
        const result = await getCheckedParticipantByEventId(event_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
const getunCheckedParticipantByEventIdController = async(req: Request, res:Response) =>{
    const {event_id} = req.params;
    try{
        const result = await getUncheckedParticipantByEventId(event_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
const getAllParticipantByEventId1Controller =  async(req:Request, res:Response) =>{
    const {event_id} = req.params;
    try{
        const result = await getAllParticipantByEventId1(event_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
export {getParticipantIdEICotroller, getParticipantStatusController,getAllParticipantByEventIdController, getParticipantAverageController, getParticipantAverageController1, getCheckedParticipantByEventIdController, getunCheckedParticipantByEventIdController, getAllParticipantByEventId1Controller};