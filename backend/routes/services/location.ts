import { Router } from "express";   
const locationRoute = Router();
import createLocationController from "../../controller/crudController/eventController/helper/createLocationController";
import { getLocByIdController } from "../../controller/crudController/eventController/helper/getLocationController";
import authMiddleware from "../../middlewares/auth/authMiddleware";

locationRoute.post('/', authMiddleware.authorizeUser, createLocationController);
locationRoute.get('/:location_id', authMiddleware.authorizeUser, getLocByIdController);

export default locationRoute;