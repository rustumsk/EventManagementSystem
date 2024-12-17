import { Router } from "express";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { createEventController } from "../../controller/crudController/eventController/create/createEventController";
import { updateIsOpenController, updateIsDoneController } from "../../controller/crudController/eventController/update/updateEventController";
const eventRouter = Router();
import { getEventByIdController, getEventByIdNameController, getEventBystudentIdController,getTopEventController } from "../../controller/crudController/eventController/read/getEventByIdController";

eventRouter.get('/sbo/event', getEventByIdNameController);
eventRouter.get('/sbo/:sbo_id',getEventByIdController);
eventRouter.post('/',authMiddleware.authorizeUser, createEventController);
eventRouter.get('/participate/:student_id', authMiddleware.authorizeUser, getEventBystudentIdController);
eventRouter.patch('/isopen', authMiddleware.authorizeUser, updateIsOpenController);
eventRouter.patch('/isdone', authMiddleware.authorizeUser, updateIsDoneController);
eventRouter.get('/top', getTopEventController);



export default eventRouter; 