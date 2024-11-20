import {Router, Request, Response} from "express";
const signupRoute = Router();
import { createLocalStudentController,createGoogleStudentController } from "../../controller/authController/signupController";

signupRoute.post('/', createLocalStudentController);
signupRoute.post('/google', createGoogleStudentController);

export default signupRoute;