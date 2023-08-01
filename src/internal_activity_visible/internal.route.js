import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import InternalController from './internal.controller.js';
var router = express.Router();

router.get("/internal_activity_visible", authenticate, InternalController.getInternalActivity);
router.post("/internal_activity_visible", authenticate, InternalController.createtInternalActivity);
router.put("/internal_activity_visible/:id", authenticate, InternalController.editInternalActivity);

export default router;

