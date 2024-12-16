import express from "express";
import upload from "../middleware/multer.js";
import {
  createItemController,
  getAllItemController,
} from "../controllers/item.controller.js";
const router = express.Router();

router.post("/createitem/:id", upload.single("item"), createItemController);
router.get("/getallitem/:id", getAllItemController);
export default router;
