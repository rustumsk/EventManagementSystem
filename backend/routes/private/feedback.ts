import { Router } from "express";
const feedbackRoute = Router();
import authMiddleware from "../../middlewares/auth/authMiddleware";
import { createFeedbackController } from "../../controller/crudController/feedbackController/create/createFeedbackController";
import { getFeedbackByEventIdController, getAverageFeedbackBySboIdController, getAverageFeedbackByEventController } from "../../controller/crudController/feedbackController/read/readFeedbackController";

feedbackRoute.post('/', authMiddleware.authorizeUser, createFeedbackController);
feedbackRoute.get('/:event_id', getFeedbackByEventIdController);
feedbackRoute.get('/ave/:sbo_id', getAverageFeedbackBySboIdController);
feedbackRoute.get('/eve/:event_id', getAverageFeedbackByEventController);

export default feedbackRoute;