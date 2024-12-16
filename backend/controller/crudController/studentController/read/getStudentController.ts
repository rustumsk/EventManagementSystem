import { Request,Response,RequestHandler } from "express"
import findStudent from "../../../../model/studentModel/read/findStudent"

const getStudentByIdController:RequestHandler = async (req: Request,res: Response) =>{
    const {studentId} = req.params;
    try{
        const data = await findStudent.getStudentByStudentId(studentId);
        res.status(200).json(data.rows[0]);
    }catch(e){
        res.status(403).json({message:"Error"});
    }    
}

const getAllParticipatedStudnetController = async(req:Request, res: Response) =>{
    const {event_id} = req.params;
    try{
        const data = await findStudent.findAllStudentParticipant(event_id);
        res.status(200).json(data);
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Error"});
    }
}
const getStudentBySboController = async(req:Request, res:Response) =>{
    const {sbo_name} = req.params;
    try{
        const data = await findStudent.getStudentBySbo(sbo_name);
        res.status(200).json(data);
    }catch(e){
        console.error(e);
        res.status(500).json("Internal Server Error");
    }
}
export {getStudentByIdController, getAllParticipatedStudnetController, getStudentBySboController};