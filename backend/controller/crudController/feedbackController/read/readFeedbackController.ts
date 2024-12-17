import { Request, Response } from "express";
import { getFeedbackByEventId, getAverageFeedbackBySboId, getAverageFeedbackByEvent } from "../../../../model/feedbackModel/readFeedback";

const getFeedbackByEventIdController = async(req:Request, res:Response) =>{
    const {event_id} = req.params;
    try{
        const result = await getFeedbackByEventId(event_id);
        res.status(200).json(result);
    }catch(e){  
        res.status(500).json(e);
    }
}
const getAverageFeedbackBySboIdController = async(req:Request, res:Response) =>{
    const {sbo_id} = req.params;
    try{
        const result = await getAverageFeedbackBySboId(sbo_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
const getAverageFeedbackByEventController = async(req:Request, res:Response) =>{
    const {event_id} = req.params;
    try{
        const result = await getAverageFeedbackByEvent(event_id);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
export {getFeedbackByEventIdController, getAverageFeedbackBySboIdController, getAverageFeedbackByEventController};