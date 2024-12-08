import { Router } from "express";
import CategoryController from "../../controller/crudController/categoryController/categoryCyontroller";
import authMiddleware from '../../middlewares/auth/authMiddleware';
const categoryRoute = Router();

categoryRoute.get('/', CategoryController.getCategoryController);
categoryRoute.get('/:category_name', CategoryController.getCategoryIdController);

export default categoryRoute