import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
import RestaurantsController from './restaurants.controller.js';
var router = express.Router();

router.get("/restaurants", authenticate, RestaurantsController.getAllRestaurants);
router.get("/restaurants/:id", authenticate, RestaurantsController.getSingleRestaurant);
router.post("/restaurants/search", authenticate, RestaurantsController.searchRestaurant);

router.post("/restaurants", upload.fields([{name: "image", maxCount: 3}]), authenticate, RestaurantsController.addRestaurant);
router.put("/restaurants/:id",upload.fields([{name: "image", maxCount: 3}]), authenticate, RestaurantsController.editRestaurant);
router.delete("/restaurants/:id", authenticate, RestaurantsController.deleteRestaurant);

export default router;

