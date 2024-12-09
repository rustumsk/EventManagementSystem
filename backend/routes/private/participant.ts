import { Router } from "express";
import createParticipantController from '../../controller/crudController/participantController/create/createParticipantController';
const participantRoute = Router();

participantRoute.post('/', createParticipantController);

export default participantRoute;