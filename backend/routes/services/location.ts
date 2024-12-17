import { Router } from "express";   
const locationRoute = Router();
import createLocationController from "../../controller/crudController/eventController/helper/createLocationController";
import { getLocByIdController, getLocationNameByIdController } from "../../controller/crudController/eventController/helper/getLocationController";
import authMiddleware from "../../middlewares/auth/authMiddleware";

locationRoute.post('/', authMiddleware.authorizeUser, createLocationController);
locationRoute.get('/:location_id', authMiddleware.authorizeUser, getLocByIdController);
locationRoute.get('/name/:location_id', getLocationNameByIdController);


export default locationRoute;