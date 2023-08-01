import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import ExtraController from './extra.controller.js';
var router = express.Router();

router.get("/extra_services_visible", authenticate, ExtraController.getExtraServices);
router.post("/extra_services_visible", authenticate, ExtraController.createtExtraServices);
router.put("/extra_services_visible/:id", authenticate, ExtraController.editExtraServices);

export default router;

