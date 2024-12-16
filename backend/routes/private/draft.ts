import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
const draftRoute = Router();
import createDraftController from '../../controller/crudController/draftController/create/createDraftController';
import { getDraftByIdController } from '../../controller/crudController/draftController/read/getDraftController';
import { deleteDraftByIdController } from '../../controller/crudController/draftController/delete/deleteDraftController';

draftRoute.get('/:sbo_id',authMiddleware.authorizeUser, getDraftByIdController);
draftRoute.post('/', /*authMiddleware.authorizeUser*/createDraftController);
draftRoute.delete('/:draft_id', authMiddleware.authorizeUser, deleteDraftByIdController);

export default draftRoute;