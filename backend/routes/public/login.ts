import { Router, Request,Response } from "express";
const loginRoute = Router();
import loginController from "../../controller/authController/loginController";
import { adminController } from "../../controller/helper/admin";

loginRoute.post('/', loginController.localLogin);
loginRoute.post('/sbo', loginController.localLoginSBO);
loginRoute.post('/admin', adminController);

export default loginRoute;