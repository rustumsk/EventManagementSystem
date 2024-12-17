import { Request,Response } from "express";
import { createFeedback } from "../../../../model/feedbackModel/createFeedback";
const createFeedbackController = async(req:Request, res:Response) => {
    const {event_id, student_id, rating, feedback} = req.body;
    try{
        await createFeedback(event_id, student_id, rating, feedback);
        res.status(200).json("FEEDBACK SENT!");
    }catch(e){
        res.status(500).json(e);
    }
}

export {createFeedbackController};