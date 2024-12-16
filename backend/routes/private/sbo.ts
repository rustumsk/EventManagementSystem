import { Router } from 'express';
import authMiddleware from '../../middlewares/auth/authMiddleware';
import { deleteSboByIdController } from '../../controller/crudController/sboController/delete/deleteSboController';
import { updateSboStatusController } from '../../controller/crudController/sboController/update/updateSboController';
import { getSboController, getSboNamesController, getSboIdByNameController, getUnverifiedController } from '../../controller/crudController/sboController/read/getSboController';
const sboRoute = Router();

sboRoute.get('/unverified', authMiddleware.authorizeUser, getUnverifiedController);
sboRoute.get('/names', getSboNamesController);
sboRoute.delete('/:sbo_id', authMiddleware.authorizeUser, deleteSboByIdController);
sboRoute.get('/names/:sbo_name', authMiddleware.authorizeUser, getSboIdByNameController);
sboRoute.get('/:sbo_id', authMiddleware.authorizeUser, getSboController);
sboRoute.patch('/status', authMiddleware.authorizeUser, updateSboStatusController);

export default sboRoute;