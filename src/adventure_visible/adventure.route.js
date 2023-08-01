import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import AdventureController from './adventure.controller.js';
var router = express.Router();

router.get("/adventure_visible", authenticate, AdventureController.getAdventure);
router.post("/adventure_visible", authenticate, AdventureController.createtAdventure);
router.put("/adventure_visible/:id", authenticate, AdventureController.editAdventure);

export default router;

