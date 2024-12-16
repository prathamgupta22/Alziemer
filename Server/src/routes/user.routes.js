import express from "express";
import {
  getAllPatientController,
  getSinglePatientController,
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("profile"), registerController);
router.post("/login", loginController);
router.get('/patient/:id',getSinglePatientController)
router.get('/allpatient',getAllPatientController)


export default router;
