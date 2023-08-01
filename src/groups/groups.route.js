import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
const router = express.Router();
import GroupsController from './groups.controller.js';

router.get("/groups", authenticate, GroupsController.getAllGroups);
router.get("/groups/:id", authenticate, GroupsController.getSingleGroup);
router.post("/groups/search", authenticate, GroupsController.searchGroup);

router.post("/groups",authenticate, GroupsController.addGroup);
router.put("/groups/:id",authenticate, GroupsController.editGroup);
router.delete("/groups/:id",authenticate, GroupsController.deleteGroup);

export default router;
