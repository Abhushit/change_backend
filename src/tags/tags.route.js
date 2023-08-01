import express from "express";
import authenticate from "../../middlewares/authenticate.js";
var router = express.Router();
import TagsController from "./tags.controller.js";

router.get("/tags", authenticate, TagsController.getAllTags);
router.get("/tags/:id", authenticate, TagsController.getSingleTag);
router.post("/tags/search",authenticate , TagsController.searchTags);

router.post("/tags", authenticate, TagsController.addTag);
router.put("/tags/:id", authenticate, TagsController.editTag);
router.delete("/tags/:id", authenticate, TagsController.deleteTag);

export default router;

