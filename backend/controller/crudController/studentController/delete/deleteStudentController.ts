import { Request, Response } from "express";
import { deleteStudentById } from "../../../../model/studentModel/delete/deleteStudent";

const deleteStudentByIdController = async(req:Request, res:Response) =>{
    const {student_id} = req.params;
    try{
        await deleteStudentById(student_id);
        res.status(200).json("Student Deleted!");
    }catch(e){
        res.status(500).json("Someting went Wrong!")
    }
};

export {deleteStudentByIdController}