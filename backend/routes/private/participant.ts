import { Router } from "express";
import createParticipantController from '../../controller/crudController/participantController/create/createParticipantController';
import { deleteParticipantByIdController } from "../../controller/crudController/participantController/delete/deleteParticipantController";
import { updateParticipantStatusController } from "../../controller/crudController/participantController/update/updateParticipantController";
import { getParticipantIdEICotroller,getParticipantStatusController, getAllParticipantByEventIdController, getParticipantAverageController,getAllParticipantByEventId1Controller, getParticipantAverageController1, getCheckedParticipantByEventIdController, getunCheckedParticipantByEventIdController} from "../../controller/crudController/participantController/read/getParticipantController";
import authMiddleware from "../../middlewares/auth/authMiddleware";
const participantRoute = Router();

participantRoute.post('/', authMiddleware.authorizeUser, createParticipantController);
participantRoute.delete('/:participant_id', authMiddleware.authorizeUser, deleteParticipantByIdController);
participantRoute.patch('/', authMiddleware.authorizeUser, updateParticipantStatusController);
participantRoute.get('/es', getParticipantIdEICotroller);
participantRoute.get('/s', getParticipantStatusController);
participantRoute.get('/all/:sbo_id', getAllParticipantByEventIdController);
participantRoute.get('/ave/:sbo_id', getParticipantAverageController);
participantRoute.get('/ave1/:sbo_id', getParticipantAverageController1);
participantRoute.get('/c/:event_id', getCheckedParticipantByEventIdController);
participantRoute.get('/u/:event_id', getunCheckedParticipantByEventIdController);
participantRoute.get('/all/p/:event_id', getAllParticipantByEventId1Controller);


export default participantRoute;