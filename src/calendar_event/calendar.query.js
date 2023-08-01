import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import CalendarController from './calendar.controller.js';
var router = express.Router();

router.get("/calendar_events",authenticate , CalendarController.getAllCalendarEvents);
router.get("/calendar_events/:id",authenticate , CalendarController.getSingleCalendarEvents);

router.post("/calendar_events",authenticate , CalendarController.addCalendarEvent);
router.put("/calendar_events/:id",authenticate , CalendarController.editCalendarEvent);
router.delete("/calendar_events/:id",authenticate , CalendarController.deleteCalendarEvent);

export default router;

