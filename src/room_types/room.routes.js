import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
var router = express.Router();
import RoomController from './room.controller.js';

router.get("/room_types", authenticate, RoomController.getAllRooms);
router.get("/room_types/:id", authenticate, RoomController.getSingleRoom);
router.post("/room_types/search",authenticate , RoomController.searchRoom);

router.post("/room_types", upload.single("image"), authenticate, RoomController.addRoom);
router.put("/room_types/:id",upload.single("image"), authenticate, RoomController.editRoom);
router.delete("/room_types/:id", authenticate, RoomController.deleteRoom);


export default router;

