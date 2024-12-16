import { Router } from "express";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { createEventController } from "../../controller/crudController/eventController/create/createEventController";
const eventRouter = Router();
import { getEventByIdController, getEventByIdNameController } from "../../controller/crudController/eventController/read/getEventByIdController";

eventRouter.get('/sbo/event', getEventByIdNameController);
eventRouter.get('/sbo/:sbo_id',getEventByIdController);
eventRouter.post('/',authMiddleware.authorizeUser, createEventController);

export default eventRouter;