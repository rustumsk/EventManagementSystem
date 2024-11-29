import { Router } from "express";
import { getStudentByIdController } from "../../controller/crudController/studentController/read/getStudentController";
const studentRouter = Router();
import authMiddleware from "../../middlewares/auth/authMiddleware";

studentRouter.get('/', (req,res) =>{
    res.send("Hello!");
});
studentRouter.get('/:studentId', authMiddleware.authorizeUser , getStudentByIdController);

export default studentRouter;