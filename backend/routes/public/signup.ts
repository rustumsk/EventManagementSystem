import {Router, Request, Response} from "express";
const signupRoute = Router();
import { findStudentController } from "../../controller/authController/signupController";

signupRoute.post('/', findStudentController);

export default signupRoute;