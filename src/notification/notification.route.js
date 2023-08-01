import express from "express";
import authenticate from "../../middlewares/authenticate.js";
var router = express.Router();
import NotificationController from "./notification.controller.js";

router.get("/push_notification", authenticate, NotificationController.getAllNotifications);
router.get("/push_notification/:id", authenticate, NotificationController.getSingleNotification);
router.post("/push_notification/search", authenticate, NotificationController.searchNotification);

router.post("/push_notification", authenticate, NotificationController.addNotification);
router.put("/push_notification/:id", authenticate, NotificationController.editNotification);
router.delete("/push_notification/:id", authenticate, NotificationController.deleteNotification);


export default router;