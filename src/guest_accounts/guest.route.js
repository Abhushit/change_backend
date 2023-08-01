import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
var router = express.Router();
import GuestController from './guest.controller.js';


router.get("/guest_accounts", authenticate, GuestController.getAllGuests);
router.get("/guest_accounts/:id", authenticate, GuestController.getSingleGuest);

router.post("/guest_accounts", authenticate, GuestController.addGuest);
router.put("/guest_accounts/:id", authenticate, GuestController.editGuest);
router.put("/guest_accounts/force_expire/:id", authenticate, GuestController.forceExpire);
router.delete("/guest_accounts/:id", authenticate, GuestController.deleteGuest);


export default router;
