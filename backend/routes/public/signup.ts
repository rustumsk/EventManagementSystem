import {Router, Request, Response} from "express";
const signupRoute = Router();
import { createLocalStudentController } from "../../controller/authController/signupController";

signupRoute.post('/', createLocalStudentController);

export default signupRoute;