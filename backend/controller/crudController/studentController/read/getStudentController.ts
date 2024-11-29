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

export {getStudentByIdController};