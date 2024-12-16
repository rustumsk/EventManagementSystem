import {Router, Request, Response} from "express";
const signupRoute = Router();
import { createLocalStudentController,createGoogleStudentController, createLSbo, createAd} from "../../controller/authController/signupController";

signupRoute.post('/', createLocalStudentController);
signupRoute.post('/google', createGoogleStudentController);
signupRoute.post('/SBO', createLSbo );
signupRoute.post('/admin', createAd);

export default signupRoute;