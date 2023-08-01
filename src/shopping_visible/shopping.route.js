import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import ShoppingController from './shopping.controller.js';
var router = express.Router();

router.get("/shopping_visible", authenticate, ShoppingController.getShopping);
router.post("/shopping_visible", authenticate, ShoppingController.createtShopping);
router.put("/shopping_visible/:id", authenticate, ShoppingController.editShopping);

export default router;

