import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
var router = express.Router();
import ExtraController from './extra.controller.js';


router.get("/extra_services",authenticate,ExtraController.getAllExtraServices);
router.get("/extra_services/:id",authenticate,ExtraController.getSingleExtraService);
router.post("/extra_services/search",authenticate,ExtraController.searchExtraService);

router.post("/extra_services",upload.fields([{name: "image", maxCount: 3}]), authenticate, ExtraController.addExtraService);
router.put("/extra_services/:id",upload.fields([{name: "image", maxCount: 3}]), authenticate, ExtraController.editExtraService);
router.delete("/extra_services/:id", authenticate,ExtraController.deletedExtraService);

export default router;
