import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import upload from '../../middlewares/upload.js';
var router = express.Router();
import AnnouncementsController from './announcements.controller.js';

router.get("/announcements", authenticate, AnnouncementsController.getAllAnnouncements);
router.get("/announcements/:id", authenticate, AnnouncementsController.getSingleAnnouncement);
router.post("/announcements/search", authenticate, AnnouncementsController.searchAnouncement);

router.post("/announcements", upload.single("image"), authenticate, AnnouncementsController.addAnnouncement);
router.put("/announcements/:id", upload.single("image"), authenticate, AnnouncementsController.editAnnouncement);
router.delete("/announcements/:id", authenticate, AnnouncementsController.deleteAnnouncement);


export default router;