import express from 'express';
import authenticate from '../../middlewares/authenticate.js';
import authorize from '../../middlewares/authorize.js';
import upload from '../../middlewares/upload.js';
var router  = express.Router();
import UsersController from './users.controller.js';

router.post("/login", UsersController.login);
// router.post("/register", UsersController.postUser);

// router.get("/users",authenticate, authorize , UsersController.getAllUsers);
router.get("/users",authenticate , UsersController.getAllUsers);
router.post("/users/add_user", authenticate , UsersController.postUser);
router.post("/users/search",authenticate , UsersController.searchUser);

router.get("/user/:id",authenticate, UsersController.getSingleUser);
router.put("/user/:id",authenticate , UsersController.updateUser);
// router.delete("/user/:id",authenticate, authorize, UsersController.deleteUser);
router.delete("/user/:id",authenticate, UsersController.deleteUser);


export default router;