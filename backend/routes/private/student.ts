import { Router } from "express";
import { getStudentByIdController } from "../../controller/crudController/studentController/read/getStudentController";
const studentRouter = Router();
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { getAllParticipatedStudnetController } from "../../controller/crudController/studentController/read/getStudentController";
import { getStudentBySboController } from "../../controller/crudController/studentController/read/getStudentController";
import { updateStudentStatusController } from "../../controller/crudController/studentController/update/updateStudentController";
import { deleteStudentByIdController } from "../../controller/crudController/studentController/delete/deleteStudentController";

studentRouter.get('/', (req,res) =>{
    res.send("Hello!");
});
studentRouter.get('/:studentId', authMiddleware.authorizeUser , getStudentByIdController);
studentRouter.get('/sbos/:sbo_name', authMiddleware.authorizeUser, getStudentBySboController);
studentRouter.delete('/:student_id', authMiddleware.authorizeUser, deleteStudentByIdController)
studentRouter.patch('/status', authMiddleware.authorizeUser, updateStudentStatusController);
studentRouter.get('/participant/:event_id', authMiddleware.authorizeUser, getAllParticipatedStudnetController);

export default studentRouter;