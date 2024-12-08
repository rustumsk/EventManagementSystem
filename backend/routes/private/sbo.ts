import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { getSboController, getSboNamesController, getSboIdByNameController } from '../../controller/crudController/sboController/read/getSboController';
const sboRoute = Router();

sboRoute.get('/names', getSboNamesController);
sboRoute.get('/names/:sbo_name', authMiddleware.authorizeUser, getSboIdByNameController);
sboRoute.get('/:sbo_id', authMiddleware.authorizeUser, getSboController);

export default sboRoute;