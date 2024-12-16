import { Request,Response } from "express";
import { updateStudentStatus } from "../../../../model/studentModel/update/updateStudent";

const updateStudentStatusController = async(req:Request, res:Response) =>{
    const {student_id} = req.body;
    try{
        await updateStudentStatus(student_id);
        res.status(200).json("Student Updated!");
    }catch(e){
        res.status(500).json("Something Went Wrong!");
    }
}
export{updateStudentStatusController}