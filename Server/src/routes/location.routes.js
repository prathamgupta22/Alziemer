import express from "express";
import upload from "../middleware/multer.js";
import {
  createLocationController,
  getAllLocationController,
} from "../controllers/location.controller.js";

const router = express.Router();

router.post(
  "/createlocation/:id/:itemid",
  upload.single("location"),
  createLocationController
);
router.get("/getalllocation/:id", getAllLocationController);

export default router;
