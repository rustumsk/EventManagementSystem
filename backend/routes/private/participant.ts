import { Router } from "express";
import createParticipantController from '../../controller/crudController/participantController/create/createParticipantController';
import { deleteParticipantByIdController } from "../../controller/crudController/participantController/delete/deleteParticipantController";
import { updateParticipantStatusController } from "../../controller/crudController/participantController/update/updateParticipantController";
import authMiddleware from "../../middlewares/auth/authMiddleware";
const participantRoute = Router();

participantRoute.post('/', authMiddleware.authorizeUser, createParticipantController);
participantRoute.delete('/:participant_id', authMiddleware.authorizeUser, deleteParticipantByIdController);
participantRoute.patch('/', authMiddleware.authorizeUser, updateParticipantStatusController);

export default participantRoute;