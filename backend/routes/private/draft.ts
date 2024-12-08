import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
const draftRoute = Router();
import createDraftController from '../../controller/crudController/draftController/create/createDraftController';
import { getDraftByIdController } from '../../controller/crudController/draftController/read/getDraftController';

draftRoute.get('/:sbo_id',authMiddleware.authorizeUser, getDraftByIdController);
draftRoute.post('/', /*authMiddleware.authorizeUser*/createDraftController);

export default draftRoute;