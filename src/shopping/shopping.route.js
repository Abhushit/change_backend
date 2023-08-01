import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
import ShoppingController from './shopping.controller.js';
var router = express.Router();

router.get("/shopping", authenticate, ShoppingController.getAllShopping);
router.get("/shopping/:id", authenticate, ShoppingController.getSingleShopping);
router.post("/shopping/search", authenticate, ShoppingController.searchShopping);

router.post("/shopping", upload.single("image"), authenticate, ShoppingController.addShopping);
router.put("/shopping/:id",upload.single("image"), authenticate, ShoppingController.editShopping);
router.delete("/shopping/:id", authenticate, ShoppingController.deleteShopping);

export default router;

