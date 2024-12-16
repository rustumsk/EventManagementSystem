import { Router } from "express";
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { getAdminController } from "../../controller/helper/admin";
const adminRouter = Router();


adminRouter.get(`/:admin_id`, authMiddleware.authorizeUser, getAdminController);

export default adminRouter;