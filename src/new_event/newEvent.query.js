import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import NewEventController from './newEvent.controller.js';
var router = express.Router();

router.get("/new_events",authenticate , NewEventController.getAllNewEvents);
router.get("/new_events/:id",authenticate , NewEventController.getSingleNewEvents);

router.post("/new_events",authenticate , NewEventController.addNewEvent);
router.put("/new_events/:id",authenticate , NewEventController.editNewEvent);
router.delete("/new_events/:id",authenticate , NewEventController.deleteNewEvent);

export default router;

