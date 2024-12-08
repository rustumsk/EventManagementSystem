import { Router, Request,Response } from "express";
const loginRoute = Router();
import loginController from "../../controller/authController/loginController";

loginRoute.post('/', loginController.localLogin);
loginRoute.post('/sbo', loginController.localLoginSBO);

export default loginRoute;