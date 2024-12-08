import {Router, Request, Response} from "express";
const signupRoute = Router();
import { createLocalStudentController,createGoogleStudentController, createLSbo} from "../../controller/authController/signupController";

signupRoute.post('/', createLocalStudentController);
signupRoute.post('/google', createGoogleStudentController);
signupRoute.post('/SBO', createLSbo );

export default signupRoute;