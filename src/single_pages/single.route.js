import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";
import SingleController from "./single.controller.js";
var router = express.Router();

router.get("/single_pages", authenticate, SingleController.getAllSinglePages);
router.get("/single_pages/:id", authenticate, SingleController.getSinglePage);
router.post("/single_pages/search", authenticate, SingleController.searchSingle);

router.post(
  "/single_pages",
  upload.fields([
    { name: "image", maxCount: 3 },
    { name: "icon", maxCount: 1 },
  ]),
  authenticate,
  SingleController.addSinglePage
);
router.put(
  "/single_pages/:id",
  upload.fields([
    { name: "image", maxCount: 3 },
    { name: "icon", maxCount: 1 },
  ]),
  authenticate,
  SingleController.editSinglePage
);
router.delete(
  "/single_pages/:id",
  authenticate,
  SingleController.deleteSinglePage
);


export default router;
