import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import RestaurantController from './restaurant.controller.js';
var router = express.Router();

router.get("/restaurant_visible", authenticate, RestaurantController.getRestaurant);
router.post("/restaurant_visible", authenticate, RestaurantController.createtRestaurant);
router.put("/restaurant_visible/:id", authenticate, RestaurantController.editRestaurant);

export default router;

