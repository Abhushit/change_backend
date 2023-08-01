import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
var router = express.Router();
import StaffsController from './staffs.controller.js';

router.get("/staff_user_roles",authenticate , StaffsController.getAllStaffs);
router.get("/staff_user_roles/:id",authenticate , StaffsController.getSingleStaff);
router.post("/staff_user_roles/search",authenticate , StaffsController.searchStaff);

router.post("/staff_user_roles",authenticate , StaffsController.addStaff);
router.put("/staff_user_roles/:id",authenticate , StaffsController.editStaff);
router.delete("/staff_user_roles/:id",authenticate , StaffsController.deleteStaff);

export default router;

