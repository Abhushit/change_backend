import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
import AdventureController from './adventure.controller.js';
var router = express.Router();

router.get("/adventure", authenticate, AdventureController.getAllAdventures);
router.get("/adventure/:id", authenticate, AdventureController.getSingleAdventure);
router.post("/adventure/search", authenticate, AdventureController.searchAdventure);

router.post("/adventure", upload.fields([{name: "image", maxCount: 3}]), authenticate, AdventureController.addAdventure);
router.put("/adventure/:id",upload.fields([{name: "image", maxCount: 3}]), authenticate, AdventureController.editAdventure);
router.delete("/adventure/:id", authenticate, AdventureController.deleteAdventure);

export default router;

