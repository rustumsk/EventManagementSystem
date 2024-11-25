import { Router, Request, Response } from "express";
const jwtRouter = Router();
import {generateTokenController} from '../../controller/authController/jwtController';

jwtRouter.post('/', generateTokenController);

export default jwtRouter;